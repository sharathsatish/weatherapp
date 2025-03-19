import React from 'react';
import Card from '../common/Card';
import { FaTemperatureHigh, FaTint, FaWind, FaCloud } from 'react-icons/fa';

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

interface WeatherCardProps {
  data: WeatherData;
  city: string;
  onAddToFavorites?: () => void;
  isFavorite?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  data,
  city,
  onAddToFavorites,
  isFavorite = false,
}) => {
  return (
    <Card className="relative">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{city}</h2>
          <p className="text-gray-500">{data.description}</p>
        </div>
        <img
          src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.description}
          className="w-16 h-16"
        />
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="flex items-center">
          <FaTemperatureHigh className="text-sky-blue-primary mr-2" />
          <div>
            <p className="text-sm text-gray-500">Temperature</p>
            <p className="text-lg font-semibold">{Math.round(data.temperature)}°C</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <FaTint className="text-sky-blue-primary mr-2" />
          <div>
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="text-lg font-semibold">{data.humidity}%</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <FaWind className="text-sky-blue-primary mr-2" />
          <div>
            <p className="text-sm text-gray-500">Wind Speed</p>
            <p className="text-lg font-semibold">{data.windSpeed} m/s</p>
          </div>
        </div>
      </div>

      {onAddToFavorites && (
        <button
          onClick={onAddToFavorites}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors duration-300 ${
            isFavorite
              ? 'text-yellow-400 hover:text-yellow-500'
              : 'text-gray-400 hover:text-sky-blue-primary'
          }`}
        >
          <FaCloud className="w-6 h-6" />
        </button>
      )}
    </Card>
  );
};

export default WeatherCard; 