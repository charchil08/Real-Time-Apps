import { Injectable } from '@angular/core';
import { HttpClient, HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { IChatMessage } from '../models/IChatMessage';
import { MessagePackHubProtocol } from "@microsoft/signalr-protocol-msgpack";
import { IChatMessage } from './../models/IChatMessage';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private apiUrl: string = "http://localhost:5255/api/chats";
  private connectionUrl: string = "http://localhost:5255/signalr";
  private messages: IChatMessage[] = [];
  private hubConnection: HubConnection | null = null;

  constructor(private http: HttpClient) {
    this.startConnection();
    this.addListeners();
  }

  private getConnection(): HubConnection {
    return new HubConnectionBuilder()
      .withUrl(this.connectionUrl)
      .withHubProtocol(new MessagePackHubProtocol())
      .configureLogging(LogLevel.Trace)
      .build();
  }

  private startConnection() {
    this.hubConnection = this.getConnection();

    this.hubConnection.start()
      .then(() => console.log("Connection established"), (err) => console.log(err, "\nconnection rejected"));
  }

  private addListeners() {
    this.hubConnection?.on("MessageReceivedFromHub", (data : IChatMessage) => {
      console.log(data, "new chat message");
      this.messages.push(data);
    });

    this.hubConnection?.on("NewUserConnected", () => {
      console.log("new user connected...");
    })

    this.hubConnection?.on("messageReceivedFromApi", (data:IChatMessage) => {
      console.log(data, "new chat message from api");
      this.messages.push(data);
    });
  }

  private buildChatMessage(mesage:string) : IChatMessage {
    return {
      connectionId : this.hubConnection?.connectionId ?? "",
      text : mesage,
      dateTime : new Date()
    };
  }

}
