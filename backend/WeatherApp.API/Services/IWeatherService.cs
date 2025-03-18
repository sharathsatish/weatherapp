using WeatherApp.API.Models;

namespace WeatherApp.API.Services;

public interface IWeatherService
{
    Task<WeatherResponse> GetWeatherAsync(string city);
    Task<IEnumerable<WeatherResponse>> GetWeatherForMultipleCitiesAsync(IEnumerable<string> cities);
    Task<bool> IsCityValidAsync(string city);
} 