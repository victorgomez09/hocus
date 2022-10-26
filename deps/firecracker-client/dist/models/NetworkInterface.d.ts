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
import type { RateLimiter } from './RateLimiter';
/**
 * Defines a network interface.
 * @export
 * @interface NetworkInterface
 */
export interface NetworkInterface {
    /**
     *
     * @type {string}
     * @memberof NetworkInterface
     */
    guestMac?: string;
    /**
     * Host level path for the guest network interface
     * @type {string}
     * @memberof NetworkInterface
     */
    hostDevName: string;
    /**
     *
     * @type {string}
     * @memberof NetworkInterface
     */
    ifaceId: string;
    /**
     *
     * @type {RateLimiter}
     * @memberof NetworkInterface
     */
    rxRateLimiter?: RateLimiter;
    /**
     *
     * @type {RateLimiter}
     * @memberof NetworkInterface
     */
    txRateLimiter?: RateLimiter;
}
/**
 * Check if a given object implements the NetworkInterface interface.
 */
export declare function instanceOfNetworkInterface(value: object): boolean;
export declare function NetworkInterfaceFromJSON(json: any): NetworkInterface;
export declare function NetworkInterfaceFromJSONTyped(json: any, ignoreDiscriminator: boolean): NetworkInterface;
export declare function NetworkInterfaceToJSON(value?: NetworkInterface | null): any;