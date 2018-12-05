import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'code-names';
  
  private _hubConnection: HubConnection;
  
  public messages: string[] = [];

  ngOnInit(): void {
    this._hubConnection = new signalR.HubConnectionBuilder().withUrl('https://localhost:5001/chatHub').build();
    this._hubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

    this._hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      this.messages.push(user + " says " + message);
    });
  }
}
