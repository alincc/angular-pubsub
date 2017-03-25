import { EventBusDecoratorMetadata } from './metadata.decorator';
import { EventBus } from '../event-bus';

export var Subscriber = (ctor: any): any => {
    var newCtor = function (...args) {
        var instance = new ctor(...args);

        EventBusDecoratorMetadata.getInstance().subscribe(instance, EventBus.Root);

        return instance;
    }

    EventBusDecoratorMetadata.getInstance().generateSubscriberId(ctor.prototype);

    Object.getOwnPropertyNames(ctor)
        .filter(prop => Object.getOwnPropertyDescriptor(ctor, prop).writable)
        .forEach(prop => newCtor[prop] = ctor[prop]);

    newCtor.prototype = ctor.prototype;

    return newCtor;
}