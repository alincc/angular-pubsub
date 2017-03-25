import { Type, SimpleChanges, SimpleChange, EventEmitter } from "@angular/core";
import {Reflection} from '../utils/reflection';

/**
 * Injects DI into class fields.
 * Works the same as correspondent decorator in Angular2 in constructor.
 * Inheritance is supported.
 */
export var Inject = (token: Type<any>) => (target: any, propertyKey: string) => {
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || <PropertyDescriptor>{ configurable: true, enumerable: true };
    // Replacing get and set
    const originalGet = descriptor.get || function () { return this.__nc_values ? this.__nc_values[<string>propertyKey] : undefined };
    const originalSet = descriptor.set || function (v) {
        this.__nc_values = this.__nc_values || {};
        this.__nc_values[<string>propertyKey] = v;
    };
    descriptor.get = function() {
        let result = originalGet.call(this);
        if (result === undefined) {
            result = Reflection.get(token);
            originalSet.call(this, result);
        }
        return result;
    }
    // Updating new property or updating descriptor
    Object.defineProperty(target, propertyKey, descriptor);
};