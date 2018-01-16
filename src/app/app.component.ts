import { Component } from '@angular/core';

@Component({
  selector: 'tc-root',
  template: `
    <div>
        <nav class='navbar navbar-default'>
            <div class='container-fluid'>
                <a class='navbar-brand'>{{pageTitle}}</a>
                <ul class='nav navbar-nav'>
                    <li><a [routerLink]="['/dashboard']">Home</a></li>
                    <li><a [routerLink]="['/timecard/search']">Timecards</a></li>
                    <li><a [routerLink]="['/vacation/request']">Vacation Request</a></li>
                </ul>
            </div>
        </nav>
        <div class='container'>
            <router-outlet></router-outlet>
        </div>
     </div>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Timecard and VRS';
}
