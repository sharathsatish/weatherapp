using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using Moq;
using Moq.Protected;
using WeatherApp.API.Models;
using WeatherApp.API.Services;
using Xunit;

namespace WeatherApp.API.Tests.Services;

public class WeatherServiceTests
{
    private readonly Mock<HttpMessageHandler> _httpMessageHandlerMock;
    private readonly Mock<ILogger<WeatherService>> _loggerMock;
    private readonly IMemoryCache _cache;
    private readonly WeatherApiSettings _settings;
    private readonly WeatherService _weatherService;

    public WeatherServiceTests()
    {
        _httpMessageHandlerMock = new Mock<HttpMessageHandler>();
        _loggerMock = new Mock<ILogger<WeatherService>>();
        _cache = new MemoryCache(new MemoryCacheOptions());
        _settings = new WeatherApiSettings
        {
            ApiKey = "test_key",
            BaseUrl = "https://api.test.com",
            CacheDurationMinutes = 5,
            RateLimitRequestsPerMinute = 60,
            MaxCitiesAllowed = 5
        };

        var httpClient = new HttpClient(_httpMessageHandlerMock.Object);
        _weatherService = new WeatherService(
            httpClient,
            _cache,
            Options.Create(_settings),
            _loggerMock.Object
        );
    }

    [Fact]
    public async Task GetWeatherAsync_ValidCity_ReturnsWeatherData()
    {
        // Arrange
        var city = "London";
        var expectedResponse = new WeatherResponse
        {
            City = city,
            Current = new CurrentWeather
            {
                Temperature = 20,
                FeelsLike = 19,
                Humidity = 65,
                WindSpeed = 5,
                Description = "Partly cloudy",
                Icon = "03d"
            }
        };

        SetupHttpResponse(expectedResponse);

        // Act
        var result = await _weatherService.GetWeatherAsync(city);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(city, result.City);
        Assert.Equal(expectedResponse.Current.Temperature, result.Current.Temperature);
    }

    [Fact]
    public async Task GetWeatherAsync_InvalidCity_ThrowsException()
    {
        // Arrange
        var city = "InvalidCity";
        SetupHttpErrorResponse();

        // Act & Assert
        await Assert.ThrowsAsync<HttpRequestException>(() => _weatherService.GetWeatherAsync(city));
    }

    [Fact]
    public async Task GetWeatherForMultipleCitiesAsync_ValidCities_ReturnsWeatherData()
    {
        // Arrange
        var cities = new[] { "London", "Paris" };
        foreach (var city in cities)
        {
            var response = new WeatherResponse
            {
                City = city,
                Current = new CurrentWeather
                {
                    Temperature = 20,
                    Description = "Partly cloudy"
                }
            };
            SetupHttpResponse(response);
        }

        // Act
        var result = await _weatherService.GetWeatherForMultipleCitiesAsync(cities);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count());
        Assert.Contains(result, w => w.City == "London");
        Assert.Contains(result, w => w.City == "Paris");
    }

    [Fact]
    public async Task GetWeatherForMultipleCitiesAsync_TooManyCities_ThrowsArgumentException()
    {
        // Arrange
        var cities = Enumerable.Repeat("City", 6); // More than MaxCitiesAllowed

        // Act & Assert
        await Assert.ThrowsAsync<ArgumentException>(() => 
            _weatherService.GetWeatherForMultipleCitiesAsync(cities));
    }

    [Fact]
    public async Task IsCityValidAsync_ValidCity_ReturnsTrue()
    {
        // Arrange
        var city = "London";
        SetupHttpResponse(new WeatherResponse { City = city });

        // Act
        var result = await _weatherService.IsCityValidAsync(city);

        // Assert
        Assert.True(result);
    }

    [Fact]
    public async Task IsCityValidAsync_InvalidCity_ReturnsFalse()
    {
        // Arrange
        var city = "InvalidCity";
        SetupHttpErrorResponse();

        // Act
        var result = await _weatherService.IsCityValidAsync(city);

        // Assert
        Assert.False(result);
    }

    private void SetupHttpResponse(WeatherResponse response)
    {
        var jsonContent = System.Text.Json.JsonSerializer.Serialize(response);
        var content = new StringContent(jsonContent);
        content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/json");

        _httpMessageHandlerMock
            .Protected()
            .Setup<Task<HttpResponseMessage>>(
                "SendAsync",
                ItExpr.Is<HttpRequestMessage>(req => req.RequestUri.ToString().Contains(response.City)),
                ItExpr.IsAny<CancellationToken>()
            )
            .ReturnsAsync(new HttpResponseMessage
            {
                StatusCode = System.Net.HttpStatusCode.OK,
                Content = content
            });
    }

    private void SetupHttpErrorResponse()
    {
        _httpMessageHandlerMock
            .Protected()
            .Setup<Task<HttpResponseMessage>>(
                "SendAsync",
                ItExpr.IsAny<HttpRequestMessage>(),
                ItExpr.IsAny<CancellationToken>()
            )
            .ReturnsAsync(new HttpResponseMessage
            {
                StatusCode = System.Net.HttpStatusCode.NotFound
            });
    }
} 