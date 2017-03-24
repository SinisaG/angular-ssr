import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ModelService } from '../shared/model/model.service';
import { Meta, MetaDefinition } from '../shared/meta.service';
import { Params, ActivatedRoute }   from '@angular/router';


@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'user',
  templateUrl: './user.component.html'
})

export class UserComponent {

  user: any = {};
  constructor(public model: ModelService, private route: ActivatedRoute, public meta: Meta) {
    // we need the data synchronously for the client to set the server response
    // we create another method so we have more control for testing
    this.universalInit(this.route.snapshot.params['name']);
    // this.universalInit(this.route.snapshot['name']);
  }

  universalInit(name) {
    return this.model
      .get(`https://api.github.com/users/${name}`)
      .subscribe(data => {
        this.user = data;
        this.handleMetadata(data);
    });
  }

  handleMetadata(data) {
    this.meta.setTitle(data.login);
    const name: MetaDefinition = {name: 'og:title', content: data.login};
    const desc: MetaDefinition = {name: 'description', content: `Find me on github | ${data.login}`};
    const img: MetaDefinition = {name: 'og:image', content: data.avatar_url};
    this.meta.addTags([name, desc]);
  }
}
