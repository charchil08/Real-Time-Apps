using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRChat.API.Hubs.Infrastructure;
using SignalRChat.API.Seeder;
using SignalRChat.API.Shared.Models;

namespace SignalRChat.API.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ChartsController : ControllerBase
{
    private readonly IHubContext<ChartHub> _hub;
    private readonly TimerManager _timer;

    public ChartsController(IHubContext<ChartHub> hub, TimerManager timer)
    {
        _hub = hub;
        _timer = timer;
    }

    [HttpGet]
    public IActionResult Get()
    {
        if(!_timer.IsTimerStarted)
        {
            _timer.PrepareTimer(() =>
            {
                _hub.Clients.All.SendAsync("TransferChartData", DataManager.GetChartData());
            });
        }
        return Ok(new
        {
            Message = "Request completed!"
        });
    }
}
    