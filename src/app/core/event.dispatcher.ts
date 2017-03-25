import { Subscriber } from './decorators/subscriber.decorator';
import { Message } from './message';
import { Injectable } from '@angular/core';

@Injectable()
@Subscriber    
export class EventDispatcher {
    listeners = [];

    trigger(name, payload) {
        this.publish(new Message(name, payload));
    }

    public publish(message: any) { }
}