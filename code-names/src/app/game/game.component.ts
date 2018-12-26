import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { Tile } from '../tile.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor() { }

  private _chatHubConnection: HubConnection;
  private _gameHubConnection: HubConnection;

  public words: string[] = [
    "pan", "china", "whip", "buck", "antarctica", "wind", "nurse", "laser", "ball", "stream", "fighter", "stone", "crane", "pole", "life", "space", "washington", "revolution", "ray", "spring", "tokyo", "mass", "belt", "change", "screen"
  ];

  public tiles: Tile[] = [];
  
  public messages: string[] = [];

  ngOnInit(): void {
    this._chatHubConnection = new signalR.HubConnectionBuilder().withUrl('https://localhost:5001/chatHub').build();
    this._gameHubConnection = new signalR.HubConnectionBuilder().withUrl('https://localhost:5001/gameHub').build();
    this._chatHubConnection
      .start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));
    this._gameHubConnection
        .start()
        .then(() => console.log('Connection started!'))
        .catch(err => console.log('Error while establishing connection :('));

    this._chatHubConnection.on('ReceiveMessage', (user: string, message: string) => {
      this.messages.push(user + " says " + message);
    });

    //TODO: Create a Game class and receive it that way
    this._gameHubConnection.on('ReceiveNewGame', (game: any) => {
      this.messages.push("A new game has been started!");
    });
  }

  public chooseCard(word: string): void {
    this._chatHubConnection.invoke("SendMessage", "Player", `I chose a card: '${word}'`).catch(function (err) {
      return console.error(err.toString());
    });
  }

  public startNewGame(): void {
    this._gameHubConnection.invoke("StartNewGame").catch(function (err) {
      return console.error(err.toString());
    });
  }

}
