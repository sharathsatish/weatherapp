import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  city: string;
  country: string;
}

export interface FavoriteLocation {
  id: string;
  city: string;
  country: string;
}

export const weatherApi = {
  getCurrentWeather: async (city: string): Promise<WeatherData> => {
    const response = await api.get(`/weather/current?city=${encodeURIComponent(city)}`);
    return response.data;
  },

  getForecast: async (city: string): Promise<WeatherData[]> => {
    const response = await api.get(`/weather/forecast?city=${encodeURIComponent(city)}`);
    return response.data;
  },

  getFavorites: async (): Promise<FavoriteLocation[]> => {
    const response = await api.get('/favorites');
    return response.data;
  },

  addFavorite: async (city: string, country: string): Promise<FavoriteLocation> => {
    const response = await api.post('/favorites', { city, country });
    return response.data;
  },

  removeFavorite: async (id: string): Promise<void> => {
    await api.delete(`/favorites/${id}`);
  },

  updateSettings: async (settings: { temperatureUnit: 'C' | 'F' }): Promise<void> => {
    await api.put('/settings', settings);
  },

  getSettings: async (): Promise<{ temperatureUnit: 'C' | 'F' }> => {
    const response = await api.get('/settings');
    return response.data;
  },
}; 