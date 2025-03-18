using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using System.Net.Http.Json;
using WeatherApp.API.Models;

namespace WeatherApp.API.Services;

public class WeatherService : IWeatherService
{
    private readonly HttpClient _httpClient;
    private readonly IMemoryCache _cache;
    private readonly WeatherApiSettings _settings;
    private readonly ILogger<WeatherService> _logger;

    public WeatherService(
        HttpClient httpClient,
        IMemoryCache cache,
        IOptions<WeatherApiSettings> settings,
        ILogger<WeatherService> logger)
    {
        _httpClient = httpClient;
        _cache = cache;
        _settings = settings.Value;
        _logger = logger;
        _httpClient.BaseAddress = new Uri(_settings.BaseUrl);
    }

    public async Task<WeatherResponse> GetWeatherAsync(string city)
    {
        var cacheKey = $"weather_{city.ToLowerInvariant()}";

        if (_cache.TryGetValue(cacheKey, out WeatherResponse? cachedResponse))
        {
            _logger.LogInformation("Cache hit for city: {City}", city);
            return cachedResponse!;
        }

        try
        {
            var response = await _httpClient.GetAsync($"/data/2.5/weather?q={city}&appid={_settings.ApiKey}&units=metric");
            response.EnsureSuccessStatusCode();

            var weatherData = await response.Content.ReadFromJsonAsync<WeatherResponse>();
            if (weatherData == null)
            {
                throw new Exception("Failed to deserialize weather data");
            }

            var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromMinutes(_settings.CacheDurationMinutes));

            _cache.Set(cacheKey, weatherData, cacheEntryOptions);
            return weatherData;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching weather data for city: {City}", city);
            throw;
        }
    }

    public async Task<IEnumerable<WeatherResponse>> GetWeatherForMultipleCitiesAsync(IEnumerable<string> cities)
    {
        if (cities.Count() > _settings.MaxCitiesAllowed)
        {
            throw new ArgumentException($"Maximum number of cities allowed is {_settings.MaxCitiesAllowed}");
        }

        var tasks = cities.Select(GetWeatherAsync);
        var results = await Task.WhenAll(tasks);
        return results;
    }

    public async Task<bool> IsCityValidAsync(string city)
    {
        try
        {
            var response = await _httpClient.GetAsync($"/data/2.5/weather?q={city}&appid={_settings.ApiKey}");
            return response.IsSuccessStatusCode;
        }
        catch
        {
            return false;
        }
    }
} 