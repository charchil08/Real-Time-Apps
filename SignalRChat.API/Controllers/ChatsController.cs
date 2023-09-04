using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRChat.API.Entities.Models;
using SignalRChat.API.Hubs.Infrastructure;

namespace SignalRChat.API.Controllers;
[Route("api/[controller]")]
[ApiController]
public class ChatsController : ControllerBase
{
    private readonly IHubContext<ChatHub> _hubContext;

    public ChatsController(IHubContext<ChatHub> hubContext)
    {
        this._hubContext = hubContext;
    }

    [HttpPost]
    public async Task<IActionResult> SendMessage(ChatMessage message)
    {
        await _hubContext.Clients.All.SendAsync("messageReceivedFromApi", message);
    }
}
