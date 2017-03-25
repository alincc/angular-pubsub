import { EventBus } from './../event-bus';
export class EventBusDecoratorMetadata {
    private static SubscriberPropertyName = "$$__subscriberId";
    private static SubscriberCounter = 0;
    static isCreating: Boolean = false;

    static instance: EventBusDecoratorMetadata;

    private messageHandlerInfo: MessageHandlerInfo[] = [];

    constructor() {
        if (!EventBusDecoratorMetadata.isCreating) {
            throw new Error("You can't call new in Singleton instances!");
        }
    }

    static getInstance() {
        if (EventBusDecoratorMetadata.instance == null) {
            EventBusDecoratorMetadata.isCreating = true;
            EventBusDecoratorMetadata.instance = new EventBusDecoratorMetadata();
            EventBusDecoratorMetadata.isCreating = false;
        }

        return EventBusDecoratorMetadata.instance;
    }

    registerMessageHandler(messageType: any, subscriberType: any, handlerMethod: (message: any) => void) {
        if (!messageType)
            throw "Message type is required.";
        if (!subscriberType)
            throw "Subscriber type is required";
        if (!handlerMethod)
            throw "Handler method is required.";

        var subscriberId = this.getSubscriberId(subscriberType);

        if (subscriberId)
            this.messageHandlerInfo.push({
                messageType: messageType,
                subscriberId: subscriberId,
                handlerMethod: handlerMethod
            });
        else
            console.debug(`Subscriber decorator missing for ${subscriberType}`);
    }

    subscribe(subscriber: any, eventBus: EventBus) {
        if (!subscriber)
            throw "Subscriber is required.";

        eventBus = eventBus || EventBus.Root;

        var subscriberId = this.getSubscriberId(subscriber);

        subscriber.publish = message => eventBus.publish(message);

        this.messageHandlerInfo
            .filter(info => subscriberId === info.subscriberId)
            .forEach(info => {
                eventBus.subscribe(info.messageType, message => info.handlerMethod.call(subscriber, message));
            });
    }

    /** Adds subscriber ID to constructor if not added and returns the id. */
    generateSubscriberId(obj: any) {
        const id = obj[EventBusDecoratorMetadata.SubscriberPropertyName];
        if (!id) {
            EventBusDecoratorMetadata.SubscriberCounter += 1;
            obj[EventBusDecoratorMetadata.SubscriberPropertyName] = `Subscriber${EventBusDecoratorMetadata.SubscriberCounter}`;
        }
    }

    getSubscriberId(value: any): string {
        let subscriberId = value[EventBusDecoratorMetadata.SubscriberPropertyName];

        if (!subscriberId && value.prototype)
            subscriberId = value.prototype[EventBusDecoratorMetadata.SubscriberPropertyName];

        return subscriberId;
    }
}

interface MessageHandlerInfo {
    messageType: any;
    subscriberId: string;
    handlerMethod: (message: any) => void;
}
