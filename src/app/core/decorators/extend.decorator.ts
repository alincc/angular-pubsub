import { Type, SimpleChanges, SimpleChange, EventEmitter } from "@angular/core";

/**
 * Extends class by method of another class.
 * @param token class from wich extension method will be taken (mixin).
 * @param fnName method name in mixin class (if not set - using method with the same name).
 *
 * Sample:
 *      class Flies {
 *          fly() { alert('Is it a bird? Is it a plane?'); }
 *      }
 *
 *      class Climbs {
 *          climb() { alert('My spider-sense is tingling.'); }
 *      }
 *
 *      class BeetleGuy extends Flies {
 *          @Extend(Climbs) climb() { }
 *      }
 *
 *      var superHero = new BeetleGuy();
 *      superHero.climb();
 * 
 */
export var Extend = (token: Type<any>, fnName?: string) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    fnName = fnName || propertyKey;
    if (fnName in token.prototype) {
        descriptor.value = token.prototype[fnName];
    } else {
        throw new Error(`Class ${token.name} does not contain the method ${fnName}.`);
    }
        
};
