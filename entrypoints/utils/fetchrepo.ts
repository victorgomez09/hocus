/* eslint-disable no-console */
import { createActivities } from "~/agent/activities";

const _PUBLIC_SSH_KEY = `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPY62OIbqCeURQjtU3m/mnYlW71TsDKa/ovAG6nXpmid hocus-tests@example.com`;
const PRIVATE_SSH_KEY = `-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACD2OtjiG6gnlEUI7VN5v5p2JVu9U7Aymv6LwBup16ZonQAAAKAebpvbHm6b
2wAAAAtzc2gtZWQyNTUxOQAAACD2OtjiG6gnlEUI7VN5v5p2JVu9U7Aymv6LwBup16ZonQ
AAAEDQ8cjnVXbbBq8YoS9i8yty9NgOgKM1Y/Nj3x7vWgloHvY62OIbqCeURQjtU3m/mnYl
W71TsDKa/ovAG6nXpmidAAAAF2hvY3VzLXRlc3RzQGV4YW1wbGUuY29tAQIDBAUG
-----END OPENSSH PRIVATE KEY-----
`;

async function run() {
  const activities = await createActivities();

  await activities.fetchRepository({
    rootFsPath: "/hocus-resources/fetchrepo.ext4",
    outputDrive: {
      pathOnHost: "/hocus-resources/repo-typebox.ext4",
      maxSizeMiB: 1000,
    },
    repository: {
      url: "git@github.com:hocus-dev/tests.git",
      credentials: {
        privateSshKey: PRIVATE_SSH_KEY,
      },
    },
  });
}

run().catch((err) => {
  console.trace(err);
  process.exit(1);
});
