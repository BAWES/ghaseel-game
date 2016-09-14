import {Component} from 'angular2/core';

import {GameComponent} from './game.component';

@Component({
    selector: 'my-app',
    templateUrl: '/app/app.component.html',
    directives: [GameComponent]
})
export class AppComponent {
}
