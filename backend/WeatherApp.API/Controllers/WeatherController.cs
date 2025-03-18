using Microsoft.AspNetCore.Mvc;
using WeatherApp.API.Models;
using WeatherApp.API.Services;

namespace WeatherApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WeatherController : ControllerBase
{
    private readonly IWeatherService _weatherService;
    private readonly ILogger<WeatherController> _logger;

    public WeatherController(IWeatherService weatherService, ILogger<WeatherController> logger)
    {
        _weatherService = weatherService;
        _logger = logger;
    }

    [HttpGet("{city}")]
    [ProducesResponseType(typeof(WeatherResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(WeatherError), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(WeatherError), StatusCodes.Status429TooManyRequests)]
    public async Task<IActionResult> GetWeather(string city)
    {
        try
        {
            if (!await _weatherService.IsCityValidAsync(city))
            {
                return NotFound(new WeatherError
                {
                    Code = "CITY_NOT_FOUND",
                    Message = $"City '{city}' not found"
                });
            }

            var weather = await _weatherService.GetWeatherAsync(city);
            return Ok(weather);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting weather for city: {City}", city);
            return StatusCode(500, new WeatherError
            {
                Code = "INTERNAL_ERROR",
                Message = "An internal error occurred"
            });
        }
    }

    [HttpPost("multiple")]
    [ProducesResponseType(typeof(IEnumerable<WeatherResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(WeatherError), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(WeatherError), StatusCodes.Status429TooManyRequests)]
    public async Task<IActionResult> GetWeatherForMultipleCities([FromBody] List<string> cities)
    {
        try
        {
            var weatherData = await _weatherService.GetWeatherForMultipleCitiesAsync(cities);
            return Ok(weatherData);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new WeatherError
            {
                Code = "TOO_MANY_CITIES",
                Message = ex.Message
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting weather for multiple cities");
            return StatusCode(500, new WeatherError
            {
                Code = "INTERNAL_ERROR",
                Message = "An internal error occurred"
            });
        }
    }
} 