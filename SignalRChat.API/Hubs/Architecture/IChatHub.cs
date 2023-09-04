using SignalRChat.API.Entities.Models;

namespace SignalRChat.API.Hubs.Architecture;

public interface IChatHub 
{
    Task MessageReceivedFromHub(ChatMessage message);

    Task NewUserConnected(string message);
}
