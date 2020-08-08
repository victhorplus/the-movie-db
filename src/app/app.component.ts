import { Component } from '@angular/core';
import { config } from './config'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = config.api_key;
}
