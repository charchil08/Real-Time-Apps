using SignalRChat.API.Entities.Models;

namespace SignalRChat.API.Seeder;

public class DataManager
{
    public static List<ChartDTO> GetChartData()
    {
        Random r = new();
        return new List<ChartDTO>()
        {
            new ChartDTO
            {
                Data = new List<int> { r.Next(1, 100) },
                Label = "Data1",
                BackgroundColor = "#5491DA",
            },
            new ChartDTO
            {
                Data = new List<int> { r.Next(1, 100) },
                Label = "Data2",
                BackgroundColor = "#E74C3C",
            },
            new ChartDTO
            {
                Data = new List<int> { r.Next(1, 100) },
                Label = "Data3",
                BackgroundColor = "#82E0AA",
            },
            new ChartDTO
            {
                Data = new List<int> { r.Next(1, 100) },
                Label = "Data4",
                BackgroundColor = "#E5E7E9",
            }
        };
    }
}
