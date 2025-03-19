import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useWeather } from '../hooks/useWeather';
import { useFavorites } from '../hooks/useFavorites';
import { Button } from './Button';
import { Input } from './Input';
import { WeatherCard } from './WeatherCard';

const searchSchema = z.object({
  city: z.string().min(1, 'City name is required'),
});

type SearchFormData = z.infer<typeof searchSchema>;

export const WeatherSearch = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const { data: weather, isLoading, error } = useWeather(city);
  const { addFavorite } = useFavorites();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      searchSchema.parse({ city });
      setCity(city);
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  const handleAddFavorite = () => {
    if (weather) {
      addFavorite({ city: weather.city, country: weather.country });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full"
        />
        <Button type="submit" className="w-full">
          Search
        </Button>
      </form>

      {isLoading && (
        <div className="mt-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto"></div>
        </div>
      )}

      {error && (
        <div className="mt-8 text-center text-red-500">
          Error fetching weather data. Please try again.
        </div>
      )}

      {weather && (
        <div className="mt-8">
          <WeatherCard weather={weather} />
          <Button
            onClick={handleAddFavorite}
            className="mt-4 w-full bg-sky-600 hover:bg-sky-700"
          >
            Add to Favorites
          </Button>
        </div>
      )}
    </div>
  );
}; 