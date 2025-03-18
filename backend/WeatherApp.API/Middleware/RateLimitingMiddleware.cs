using Microsoft.Extensions.Options;
using System.Collections.Concurrent;
using WeatherApp.API.Models;

namespace WeatherApp.API.Middleware;

public class RateLimitingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RateLimitingMiddleware> _logger;
    private readonly WeatherApiSettings _settings;
    private static readonly ConcurrentDictionary<string, Queue<DateTime>> _requestTimestamps = new();

    public RateLimitingMiddleware(
        RequestDelegate next,
        IOptions<WeatherApiSettings> settings,
        ILogger<RateLimitingMiddleware> logger)
    {
        _next = next;
        _settings = settings.Value;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var clientIp = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        var requestsQueue = _requestTimestamps.GetOrAdd(clientIp, _ => new Queue<DateTime>());

        // Remove timestamps older than 1 minute
        var threshold = DateTime.UtcNow.AddMinutes(-1);
        while (requestsQueue.Count > 0 && requestsQueue.Peek() < threshold)
        {
            requestsQueue.Dequeue();
        }

        if (requestsQueue.Count >= _settings.RateLimitRequestsPerMinute)
        {
            _logger.LogWarning("Rate limit exceeded for IP: {ClientIp}", clientIp);
            context.Response.StatusCode = 429; // Too Many Requests
            await context.Response.WriteAsJsonAsync(new WeatherError
            {
                Code = "RATE_LIMIT_EXCEEDED",
                Message = "Too many requests. Please try again later."
            });
            return;
        }

        requestsQueue.Enqueue(DateTime.UtcNow);
        await _next(context);
    }
} 