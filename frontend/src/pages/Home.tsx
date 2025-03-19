import React, { useState } from 'react';
import WeatherSearch from '../components/weather/WeatherSearch';
import WeatherCard from '../components/weather/WeatherCard';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

const Home: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchCity: string) => {
    setIsLoading(true);
    setError(null);
    setCity(searchCity);

    try {
      const response = await fetch(`/api/weather/current?city=${encodeURIComponent(searchCity)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Weather Monitor
      </h1>
      
      <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      {weatherData && (
        <div className="mt-8">
          <WeatherCard
            data={weatherData}
            city={city}
            onAddToFavorites={() => {
              // TODO: Implement add to favorites functionality
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Home; 