import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'http://localhost:5000/api';

interface FavoriteCity {
  city: string;
  country: string;
}

interface Settings {
  temperatureUnit: 'celsius' | 'fahrenheit';
  theme: 'light' | 'dark';
}

export const handlers = [
  // Get current weather
  http.get('/api/weather', ({ request }) => {
    const url = new URL(request.url);
    const city = url.searchParams.get('city');
    
    if (!city) {
      return new HttpResponse(null, { status: 400 });
    }

    return HttpResponse.json({
      city,
      temperature: 20,
      conditions: 'Sunny',
      humidity: 45,
      windSpeed: 10,
    });
  }),

  // Get favorites
  http.get('/api/favorites', () => {
    return HttpResponse.json([
      { id: 1, city: 'London', country: 'UK' },
      { id: 2, city: 'Paris', country: 'France' },
    ]);
  }),

  // Add favorite
  http.post('/api/favorites', async ({ request }) => {
    const data = await request.json() as FavoriteCity;
    return HttpResponse.json({
      id: Math.random(),
      city: data.city,
      country: data.country,
    });
  }),

  // Remove favorite
  http.delete('/api/favorites/:id', () => {
    return new HttpResponse(null, { status: 204 });
  }),

  // Get settings
  http.get('/api/settings', () => {
    return HttpResponse.json({
      temperatureUnit: 'celsius' as const,
      theme: 'light' as const,
    });
  }),

  // Update settings
  http.put('/api/settings', async ({ request }) => {
    const data = await request.json() as Settings;
    return HttpResponse.json(data);
  }),
]; 