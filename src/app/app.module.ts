import { BlogComponent } from './post/blog.component';
import { PostService } from './post/post.service';
import { BlogService } from './post/blog.service';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler as NgErrorHandler, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CoreModule
  ],
  declarations: [
    AppComponent, BlogComponent
  ],
  providers: [BlogService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
