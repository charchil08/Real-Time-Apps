import { Component, OnInit } from '@angular/core';
import { SignalrService } from './services/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'SignalR chat App';
  message: string = '';

  constructor(public signalrService :SignalrService) {}

  ngOnInit() {
    this.signalrService.connect();
  }

  sendMessage():void {
    this.signalrService.sendMessageToHub(this.message);
  }
}
