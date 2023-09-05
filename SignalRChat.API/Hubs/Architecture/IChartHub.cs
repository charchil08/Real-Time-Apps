namespace SignalRChat.API.Hubs.Architecture;

using SignalRChat.API.Entities.Models;

public interface IChartHub
{
    Task ChartDataReceivedFromHub(ChartDTO dto);
}