import { EventDispatcher } from './event.dispatcher';
import { NgModule, ErrorHandler as NgErrorHandler, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { Http, HttpModule, XHRBackend, RequestOptions } from "@angular/http";
import { Reflection } from './utils/reflection';

@NgModule({
    declarations: [],
    exports: [],
    imports: [
        HttpModule
    ],
    providers: [
        EventDispatcher
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule {
    public static Injector: Injector;

    constructor(public injector: Injector) {
        Reflection.Injector = injector;
        CoreModule.Injector = injector;
    }
}



