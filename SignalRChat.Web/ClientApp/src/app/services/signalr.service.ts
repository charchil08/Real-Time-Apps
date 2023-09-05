import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { IChatMessage } from '../models/IChatMessage';
import { MessagePackHubProtocol } from "@microsoft/signalr-protocol-msgpack";
import { from, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private apiUrl: string = "http://localhost:5255/api/chats";
  private connectionUrl: string = "http://localhost:5255/signalr";
  public messages: IChatMessage[] = [];
  private hubConnection: HubConnection | null = null;

  constructor(private http: HttpClient) { 
    this.startConnection();
  }

  public connect = () => {
    // this.startConnection();
    this.addListeners();
  };

  private getConnection(): HubConnection {
    return new HubConnectionBuilder()
      .withUrl(this.connectionUrl)
      .withHubProtocol(new MessagePackHubProtocol())
      .configureLogging(LogLevel.Trace)
      .build();
  }

  public sendMessageToApi(message: string) {
    this.http.post(this.apiUrl, this.buildChatMessage(message))
      .pipe(tap(_ => console.log(_, "message sent to api")));
  }

  public sendMessageToHub(message: string): any {
    let chatMessage : IChatMessage = this.buildChatMessage(message);
    debugger;
    //invoke is for sending purpose from client to server
    return this.hubConnection?.invoke("BroadcastAsync", chatMessage)
      .then(() => {
        console.log("Sent message to hub");
      })
      .catch((err) => {
        console.log("🚀 ~ file: signalr.service.ts:42 ~ SignalrService ~ sendMessageToHub ~ err:", err)
      });
  }

  private startConnection() {
    this.hubConnection = this.getConnection();

    this.hubConnection.start()
      .then(() => console.log("Connection established"), (err) => console.log(err, "\nconnection rejected"));
  }

  private addListeners() {
    this.hubConnection?.on("MessageReceivedFromHub", (data: IChatMessage) => {
      console.log(data, "new chat message");
      this.messages.push(data);
    });

    this.hubConnection?.on("NewUserConnected", () => {
      console.log("new user connected...");
    })

    this.hubConnection?.on("messageReceivedFromApi", (data: IChatMessage) => {
      console.log(data, "new chat message from api");
      this.messages.push(data);
    });
  }

  private buildChatMessage(mesage: string): IChatMessage {
    return {
      ConnectionId: this.hubConnection?.connectionId ?? "",
      Message: mesage,
      DateTime: new Date()
    };
  }

}
