import { Injectable } from '@angular/core';
import { IChartData } from '../models/IChartData.interface';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { MessagePackHubProtocol } from '@microsoft/signalr-protocol-msgpack';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignalrChartService {

  private apiUrl: string = "http://localhost:5255/api/charts";
  private connectionUrl: string = "http://localhost:5255/signalr/chart";
  private hubConnection: HubConnection | null = null;
  public data: IChartData[] = [];

  constructor(private http: HttpClient) {
    this.startConnection();
  }

  public connect = () => {
    this.addListeners();
  };

  public getChartDataFromApi() {
    this.http.get<IChartData[]>(this.apiUrl)
      .subscribe(res => {
        console.log("🚀 ~ file: signalr-chart.service.ts:28 ~ SignalrChartService ~ getChartDataFromApi ~ res:", res)
        this.data = res;
      })      
  }

  private startConnection = () => {
    this.hubConnection = this.getConnection();

    this.hubConnection.start()
      .then(() => console.log("Connection established"), (err) => console.log(err, "\nconnection rejected"));
  }


  private getConnection(): HubConnection {
    return new HubConnectionBuilder()
      .withUrl(this.connectionUrl)
      .withHubProtocol(new MessagePackHubProtocol())
      .configureLogging(LogLevel.Error)
      .build();
  }

  private addListeners() {
    this.hubConnection?.on("TransferChartData", (res: IChartData[]) => {
      this.data = res;
      console.log("🚀 ~ file: signalr-chart.service.ts:35 ~ SignalrChartService ~ this.hubConnection?.on ~ res:", res)
    });
  }
}