import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'my-component',
  template: `
  <button id="button" (click)="click($event, false)">Get something</button>
    <table>
      <thead>
      <th>Body</th>
      <th>Title</th>
      </thead>
      <tbody>

      <tr *ngFor="let listItem of listItems; let i = index; let even = even; let odd = odd; let first = first; let last = last;"
          [ngClass]="{ odd: odd, even: even, first: first, last: last }">
        <td>{{listItem.body | json}}</td>
        <td>{{listItem.title | json}}</td>
      </tr>
      
      </tbody>
    </table>

  {{ arrayJson | async }}
  `,
  styles: [`
    table, th, td {
      border: 1px solid black;
      padding: 15px;
    }
    .even {
      background: #e7e7e7;
    }
    .odd {

    }
    .first {
      background: #b3b3b3;
    }
    .last {
      background: #b3b3b3;
    }
  `]
})


export class myComponent  {
  listItems: any;
  arrayJson: any;

  constructor(private http: Http) {}

    click(){
      this.arrayJson = this.http.get('https://jsonplaceholder.typicode.com/posts')
        //.map(n=> n.json())
         .map((value) => this.renderData(value));
    }

    renderData(data) {
      this.listItems = data.json();
      console.log('data', this.listItems);
    }

}
