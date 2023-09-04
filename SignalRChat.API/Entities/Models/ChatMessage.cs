namespace SignalRChat.API.Entities.Models;

public class ChatMessage
{
    public string Text { get; set; } = null!;
    public string ConnectionId { get; set; } = null!;
    public DateTime DateTime { get; set; }
}
