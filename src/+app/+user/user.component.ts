import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ModelService } from '../shared/model/model.service';
import { Params, ActivatedRoute }   from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'user',
  templateUrl: './user.component.html'
})

export class UserComponent {

  user: any = {};
  constructor(public model: ModelService, private route: ActivatedRoute) {
    // we need the data synchronously for the client to set the server response
    // we create another method so we have more control for testing
    this.universalInit(this.route.snapshot.params['name']);
    // this.universalInit(this.route.snapshot['name']);
  }

  universalInit(name) {
    this.model
      .get(`https://api.github.com/users/${name}`)
      .subscribe(data => {
        console.log(data);
        this.user = data;
    });
  }

}
