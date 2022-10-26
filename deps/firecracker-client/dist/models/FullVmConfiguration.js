"use strict";
/* tslint:disable */
/* eslint-disable */
/**
 * Firecracker API
 * RESTful public-facing API. The API is accessible through HTTP calls on specific URLs carrying JSON modeled data. The transport medium is a Unix Domain Socket.
 *
 * The version of the OpenAPI document: 1.1.2
 * Contact: compute-capsule@amazon.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullVmConfigurationToJSON = exports.FullVmConfigurationFromJSONTyped = exports.FullVmConfigurationFromJSON = exports.instanceOfFullVmConfiguration = void 0;
const runtime_1 = require("../runtime");
const Balloon_1 = require("./Balloon");
const BootSource_1 = require("./BootSource");
const Drive_1 = require("./Drive");
const Logger_1 = require("./Logger");
const MachineConfiguration_1 = require("./MachineConfiguration");
const Metrics_1 = require("./Metrics");
const MmdsConfig_1 = require("./MmdsConfig");
const NetworkInterface_1 = require("./NetworkInterface");
const Vsock_1 = require("./Vsock");
/**
 * Check if a given object implements the FullVmConfiguration interface.
 */
function instanceOfFullVmConfiguration(value) {
    let isInstance = true;
    return isInstance;
}
exports.instanceOfFullVmConfiguration = instanceOfFullVmConfiguration;
function FullVmConfigurationFromJSON(json) {
    return FullVmConfigurationFromJSONTyped(json, false);
}
exports.FullVmConfigurationFromJSON = FullVmConfigurationFromJSON;
function FullVmConfigurationFromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'balloon': !(0, runtime_1.exists)(json, 'balloon') ? undefined : (0, Balloon_1.BalloonFromJSON)(json['balloon']),
        'drives': !(0, runtime_1.exists)(json, 'drives') ? undefined : (json['drives'].map(Drive_1.DriveFromJSON)),
        'bootSource': !(0, runtime_1.exists)(json, 'boot-source') ? undefined : (0, BootSource_1.BootSourceFromJSON)(json['boot-source']),
        'logger': !(0, runtime_1.exists)(json, 'logger') ? undefined : (0, Logger_1.LoggerFromJSON)(json['logger']),
        'machineConfig': !(0, runtime_1.exists)(json, 'machine-config') ? undefined : (0, MachineConfiguration_1.MachineConfigurationFromJSON)(json['machine-config']),
        'metrics': !(0, runtime_1.exists)(json, 'metrics') ? undefined : (0, Metrics_1.MetricsFromJSON)(json['metrics']),
        'mmdsConfig': !(0, runtime_1.exists)(json, 'mmds-config') ? undefined : (0, MmdsConfig_1.MmdsConfigFromJSON)(json['mmds-config']),
        'networkInterfaces': !(0, runtime_1.exists)(json, 'network-interfaces') ? undefined : (json['network-interfaces'].map(NetworkInterface_1.NetworkInterfaceFromJSON)),
        'vsock': !(0, runtime_1.exists)(json, 'vsock') ? undefined : (0, Vsock_1.VsockFromJSON)(json['vsock']),
    };
}
exports.FullVmConfigurationFromJSONTyped = FullVmConfigurationFromJSONTyped;
function FullVmConfigurationToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'balloon': (0, Balloon_1.BalloonToJSON)(value.balloon),
        'drives': value.drives === undefined ? undefined : (value.drives.map(Drive_1.DriveToJSON)),
        'boot-source': (0, BootSource_1.BootSourceToJSON)(value.bootSource),
        'logger': (0, Logger_1.LoggerToJSON)(value.logger),
        'machine-config': (0, MachineConfiguration_1.MachineConfigurationToJSON)(value.machineConfig),
        'metrics': (0, Metrics_1.MetricsToJSON)(value.metrics),
        'mmds-config': (0, MmdsConfig_1.MmdsConfigToJSON)(value.mmdsConfig),
        'network-interfaces': value.networkInterfaces === undefined ? undefined : (value.networkInterfaces.map(NetworkInterface_1.NetworkInterfaceToJSON)),
        'vsock': (0, Vsock_1.VsockToJSON)(value.vsock),
    };
}
exports.FullVmConfigurationToJSON = FullVmConfigurationToJSON;