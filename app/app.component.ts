import {Component} from '@angular/core';

import {GameComponent} from './game.component';

@Component({
    selector: 'my-app',
    template: `
    <div style='text-align:center; margin:0;padding:0;'>
        <img src='images/ghaseel-logo.png' style='width:100px;margin:0;padding:0;'/>
        <h3 style='margin-top:0; padding-top:0;'>Ghaseel Game</h3>
        <h5>Press from 1 to 50</h5>
    </div>
    <game></game>

    <div  style='text-align:center; margin-top:10px;'>
        <a href='https://itunes.apple.com/us/app/ghaseel-ghsyl/id1052534178?ls=1&mt=8' target='_blank'>
            <img src='images/appstore.png' style='width:130px'/>
        </a>

        <br/><br/><br/><br/>

        <div class="well well-sm" style='display:inline;'>
            <a href='http://bawes.net' target='_blank'>
                <img src='http://bawes.net/wp-content/uploads/2016/03/logo.png' style='width:50px;'/>
                Built Awesome by BAWES</a>
        </div>
    </div>
    `
})
export class AppComponent {
}
