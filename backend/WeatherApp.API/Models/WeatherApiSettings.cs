namespace WeatherApp.API.Models;

public class WeatherApiSettings
{
    public string ApiKey { get; set; } = string.Empty;
    public string BaseUrl { get; set; } = string.Empty;
    public int CacheDurationMinutes { get; set; }
    public int RateLimitRequestsPerMinute { get; set; }
    public int MaxCitiesAllowed { get; set; }
} 