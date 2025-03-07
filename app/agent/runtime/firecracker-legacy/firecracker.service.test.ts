import { v4 as uuidv4 } from "uuid";

import { createAgentInjector } from "../../agent-injector";
import { execCmd, execSshCmd, sleep } from "../../utils";

import { TestEnvironmentBuilder } from "~/test-utils/test-environment-builder";
import { Token } from "~/token";

const testEnv = new TestEnvironmentBuilder(createAgentInjector).withTestLogging();

test.concurrent(
  "startFirecrackerInstance",
  testEnv.run(async ({ injector, runId }) => {
    const fcService = injector.resolve(Token.FirecrackerService)(runId);
    let pid: number | null = null;

    try {
      pid = await fcService["startFirecrackerInstance"]();
      // we wait for a bit to make sure the instance does not exit
      await sleep(250);
      // check that the process is still running
      await execCmd("ps", "-p", pid.toString());
    } finally {
      if (pid != null) {
        process.kill(pid);
      }
    }
  }),
);

// tests that when a firecracker process exits, withVM throws in a reasonable amount of time
test.concurrent(
  "withVM - unresponsive ssh",
  testEnv.run(async ({ injector }) => {
    const instanceId = uuidv4();
    const fcService = injector.resolve(Token.FirecrackerService)(instanceId);
    const agentConfig = injector.resolve(Token.Config).agent();

    let sshCommandExitedWithin: number | null = null;
    await expect(
      fcService.withVM(
        {
          ssh: {
            username: "hocus",
            password: "hocus",
          },
          kernelPath: agentConfig.defaultKernel,
          rootFsPath: agentConfig.fetchRepositoryRootFs,
          copyRootFs: true,
          memSizeMib: 128,
          vcpuCount: 1,
        },
        async ({ ssh, firecrackerPid }) => {
          process.kill(firecrackerPid, "SIGKILL");
          const now = Date.now();
          await execSshCmd({ ssh }, ["bash", "-c", "echo hey"]).catch(() => {
            sshCommandExitedWithin = Date.now() - now;
          });
        },
      ),
    ).rejects.toThrow();
    expect(sshCommandExitedWithin).not.toBe(null);
    expect(sshCommandExitedWithin).toBeLessThan(5000);
  }),
);

test.concurrent(
  "getVMInfo",
  testEnv.run(async ({ injector }) => {
    const instanceId = uuidv4();
    const fcService = injector.resolve(Token.FirecrackerService)(instanceId);
    const agentConfig = injector.resolve(Token.Config).agent();

    const vmInfo = await fcService.withVM(
      {
        ssh: {
          username: "hocus",
          password: "hocus",
        },
        kernelPath: agentConfig.defaultKernel,
        rootFsPath: agentConfig.fetchRepositoryRootFs,
        copyRootFs: true,
        removeVmDirAfterPoweroff: false,
        memSizeMib: 128,
        vcpuCount: 1,
      },
      async () => {
        return await fcService.getVMInfo();
      },
    );
    expect(vmInfo).not.toBeNull();
    expect(vmInfo?.status).toBe("on");
    expect(vmInfo?.info.instanceId).toBe(instanceId);

    const vmInfo2 = await fcService.getVMInfo();
    expect(vmInfo2).not.toBeNull();
    expect(vmInfo2?.info).toEqual(vmInfo?.info);

    await fcService["deleteVMDir"]();

    const vmInfo3 = await fcService.getVMInfo();
    expect(vmInfo3).toBeNull();

    await fcService.cleanup();
  }),
);
