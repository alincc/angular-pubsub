Testing publish-subscribe in angular 2+ with typescript, using a custom @Inject to resolve dependencies.

TODO: dependencies provided in constructor do not work.

### List of decorators
 - @Subscriber - class decorator
 - @ListenTo(class) - method decorator
 - @Inject(class) - property decorator

```js
@Component({
    selector: 'app-blog',
    template: `
        <h3>
        Blog post
        <small>View details in console</small>
        </h3>

        <form (submit)="save()" #form>
            <div class="form-group">
                <label for="title">Post title *</label>
                <input type="text" id="title" name="title" class="form-control" [(ngModel)]="post.title" required>
            </div>

            <div class="form-group">
                <label for="content">Email address</label>
                <textarea id="content" name="content" class="form-control" [(ngModel)]="post.content"></textarea>
            </div>

            <button type="submit" [disabled]="saving || !post.title" class="btn btn-lg btn-success">Save</button>
            <p *ngIf="saving">Saving... Open console...</p>
        </form>
    `
})
@Subscriber
export class BlogComponent {
    saving: Boolean;
    post = {}

    @Inject(BlogService)
    blogService: BlogService;

    constructor() { }

    save() {
        this.saving = true;
        this.blogService.save(this.post);
    }

    @ListenTo(Message)
    saveCompleted(payload) {
        this.saving = false;
        this.post = {};
        console.log("SAVE_COMPLETE received, with payload", payload);
    }
}
```


## Demo

Run `ng serve` to start dev server, then navigate to `http://localhost:4200/`.
