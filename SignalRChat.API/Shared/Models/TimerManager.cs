namespace SignalRChat.API.Shared.Models;

public class TimerManager
{
    private Timer? _timer;
    private AutoResetEvent _autoResetEvent;
    private Action? _action;
    public DateTime TimerStarted { get; set; }
    public bool IsTimerStarted { get; set; }

    public void PrepareTimer(Action action)
    {
        _action= action;
        _autoResetEvent = new AutoResetEvent(false);
        _timer = new Timer(Execute, _autoResetEvent, 1000, 2000);
        TimerStarted = DateTime.UtcNow;
        IsTimerStarted= true;
    }

    public void Execute(object? stateInfo)
    {
        _action();
        if((DateTime.UtcNow - TimerStarted).TotalSeconds > 60)
        {
            IsTimerStarted= false;
            _timer?.Dispose();
        }
    }
}