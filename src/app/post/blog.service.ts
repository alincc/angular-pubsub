import { EventDispatcher } from './../core/event.dispatcher';
import { PostService } from './post.service';
import { Inject } from './../core/decorators/inject.decorator';
import { Injectable } from '@angular/core';


@Injectable()
export class BlogService {

    //@Inject(PostService)
    //postService: PostService;

    @Inject(EventDispatcher)
    dispatcher: EventDispatcher;

    save(post) {
        //this.postService.save(post);
        console.log("BlogService::save()", post);

        post.date = new Date();

        // Simulate a wait. Can be removed        
        setTimeout(() => {
            // Dispatch a message 
            this.dispatcher.trigger("SAVE_COMPLETE", post);
        }, 1000);
    }

}