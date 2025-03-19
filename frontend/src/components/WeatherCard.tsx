import { WeatherData } from '../services/api';
import { useSettings } from '../hooks/useSettings';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  const { settings } = useSettings();

  const convertTemperature = (temp: number) => {
    if (settings.temperatureUnit === 'F') {
      return (temp * 9/5) + 32;
    }
    return temp;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-sky-900 mb-4">
        {weather.city}, {weather.country}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Temperature</p>
          <p className="text-3xl font-semibold text-sky-600">
            {convertTemperature(weather.temperature).toFixed(1)}°{settings.temperatureUnit}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Humidity</p>
          <p className="text-3xl font-semibold text-sky-600">{weather.humidity}%</p>
        </div>
        <div>
          <p className="text-gray-600">Wind Speed</p>
          <p className="text-3xl font-semibold text-sky-600">{weather.windSpeed} m/s</p>
        </div>
        <div>
          <p className="text-gray-600">Description</p>
          <p className="text-3xl font-semibold text-sky-600 capitalize">{weather.description}</p>
        </div>
      </div>
    </div>
  );
}; 