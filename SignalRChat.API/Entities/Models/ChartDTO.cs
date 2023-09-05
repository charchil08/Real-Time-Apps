namespace SignalRChat.API.Entities.Models;

public class ChartDTO
{
    public List<int> Data { get; set; }
    public string? Label { get; set; }
    public string? BackgroundColor { get; set; }

    public ChartDTO()
    {
        Data = new List<int>();
    }
}