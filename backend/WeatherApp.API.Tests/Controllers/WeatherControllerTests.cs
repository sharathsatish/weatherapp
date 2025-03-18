using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using WeatherApp.API.Controllers;
using WeatherApp.API.Models;
using WeatherApp.API.Services;
using Xunit;

namespace WeatherApp.API.Tests.Controllers;

public class WeatherControllerTests
{
    private readonly Mock<IWeatherService> _weatherServiceMock;
    private readonly Mock<ILogger<WeatherController>> _loggerMock;
    private readonly WeatherController _controller;

    public WeatherControllerTests()
    {
        _weatherServiceMock = new Mock<IWeatherService>();
        _loggerMock = new Mock<ILogger<WeatherController>>();
        _controller = new WeatherController(_weatherServiceMock.Object, _loggerMock.Object);
    }

    [Fact]
    public async Task GetWeather_ValidCity_ReturnsOkResult()
    {
        // Arrange
        var city = "London";
        var expectedWeather = new WeatherResponse
        {
            City = city,
            Current = new CurrentWeather
            {
                Temperature = 20,
                Description = "Partly cloudy"
            }
        };

        _weatherServiceMock.Setup(x => x.IsCityValidAsync(city))
            .ReturnsAsync(true);
        _weatherServiceMock.Setup(x => x.GetWeatherAsync(city))
            .ReturnsAsync(expectedWeather);

        // Act
        var result = await _controller.GetWeather(city);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var weatherResponse = Assert.IsType<WeatherResponse>(okResult.Value);
        Assert.Equal(city, weatherResponse.City);
    }

    [Fact]
    public async Task GetWeather_InvalidCity_ReturnsNotFound()
    {
        // Arrange
        var city = "InvalidCity";
        _weatherServiceMock.Setup(x => x.IsCityValidAsync(city))
            .ReturnsAsync(false);

        // Act
        var result = await _controller.GetWeather(city);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
        var error = Assert.IsType<WeatherError>(notFoundResult.Value);
        Assert.Equal("CITY_NOT_FOUND", error.Code);
    }

    [Fact]
    public async Task GetWeatherForMultipleCities_ValidCities_ReturnsOkResult()
    {
        // Arrange
        var cities = new List<string> { "London", "Paris" };
        var expectedWeather = cities.Select(city => new WeatherResponse
        {
            City = city,
            Current = new CurrentWeather
            {
                Temperature = 20,
                Description = "Partly cloudy"
            }
        });

        _weatherServiceMock.Setup(x => x.GetWeatherForMultipleCitiesAsync(cities))
            .ReturnsAsync(expectedWeather);

        // Act
        var result = await _controller.GetWeatherForMultipleCities(cities);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var weatherResponses = Assert.IsAssignableFrom<IEnumerable<WeatherResponse>>(okResult.Value);
        Assert.Equal(2, weatherResponses.Count());
    }

    [Fact]
    public async Task GetWeatherForMultipleCities_TooManyCities_ReturnsBadRequest()
    {
        // Arrange
        var cities = Enumerable.Repeat("City", 6).ToList();
        _weatherServiceMock.Setup(x => x.GetWeatherForMultipleCitiesAsync(cities))
            .ThrowsAsync(new ArgumentException("Maximum number of cities allowed is 5"));

        // Act
        var result = await _controller.GetWeatherForMultipleCities(cities);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        var error = Assert.IsType<WeatherError>(badRequestResult.Value);
        Assert.Equal("TOO_MANY_CITIES", error.Code);
    }

    [Fact]
    public async Task GetWeather_ServiceException_ReturnsInternalServerError()
    {
        // Arrange
        var city = "London";
        _weatherServiceMock.Setup(x => x.IsCityValidAsync(city))
            .ReturnsAsync(true);
        _weatherServiceMock.Setup(x => x.GetWeatherAsync(city))
            .ThrowsAsync(new Exception("Service error"));

        // Act
        var result = await _controller.GetWeather(city);

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusCodeResult.StatusCode);
        var error = Assert.IsType<WeatherError>(statusCodeResult.Value);
        Assert.Equal("INTERNAL_ERROR", error.Code);
    }
} 