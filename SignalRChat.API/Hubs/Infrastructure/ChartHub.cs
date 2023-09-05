using Microsoft.AspNetCore.SignalR;
using SignalRChat.API.Entities.Models;
using SignalRChat.API.Hubs.Architecture;

namespace SignalRChat.API.Hubs.Infrastructure;

public class ChartHub : Hub<IChartHub>
{
    //public async Task ChartDataReceivedFromHub(ChartDTO dto)
    //{
    //    await Clients. ("ChartDataReceivedFromHub", dto);
    //}
}