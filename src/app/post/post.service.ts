import { Inject } from './../core/decorators/inject.decorator';
import { Injectable } from '@angular/core';


@Injectable()
export class PostService {
        save(post) {
        console.log("PostService::save()", post);
    }
}