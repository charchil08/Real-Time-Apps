using Microsoft.AspNetCore.SignalR;
using SignalRChat.API.Entities.Models;
using SignalRChat.API.Hubs.Architecture;

namespace SignalRChat.API.Hubs.Infrastructure;

public class ChatHub : Hub<IChatHub>
{
    public async Task BroadcastAsync(ChatMessage chatMessage)
    {
        await Clients.All.MessageReceivedFromHub(chatMessage);
    }

    public override async Task OnConnectedAsync()
    {
        await Clients.All.NewUserConnected("A new User connected !");
    }
}
