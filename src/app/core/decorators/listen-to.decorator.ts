import { EventBusDecoratorMetadata } from './metadata.decorator';

export var ListenTo = (messageType: any) => {
    return function (target: any, key: string, value: TypedPropertyDescriptor<any>) {
        EventBusDecoratorMetadata.getInstance().generateSubscriberId(target);
        EventBusDecoratorMetadata.getInstance().registerMessageHandler(messageType, target, target[key]);
    };
}