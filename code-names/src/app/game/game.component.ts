import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor() { }

  private _hubConnection: HubConnection;

  public words: string[] = [
    "pan", "china", "whip", "buck", "antarctica", "wind", "nurse", "laser", "ball", "stream", "fighter", "stone", "crane", "pole", "life", "space", "washington", "revolution", "ray", "spring", "tokyo", "mass", "belt", "change", "screen"
  ];
  
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

  public chooseCard(word: string): void {
    this._hubConnection.invoke("SendMessage", "Player", `I chose a card: '${word}'`).catch(function (err) {
      return console.error(err.toString());
    });

  }

}
