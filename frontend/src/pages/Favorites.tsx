import { useFavorites } from '../hooks/useFavorites';
import { useWeather } from '../hooks/useWeather';
import { WeatherCard } from '../components/WeatherCard';
import { Button } from '../components/Button';
import { FavoriteLocation } from '../services/api';

export const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-sky-900 mb-8">Favorite Locations</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>No favorite locations yet.</p>
          <p className="mt-2">Add locations from the home page to see them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite: FavoriteLocation) => (
            <FavoriteWeatherCard
              key={favorite.id}
              favorite={favorite}
              onRemove={() => removeFavorite(favorite.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface FavoriteWeatherCardProps {
  favorite: { id: string; city: string; country: string };
  onRemove: () => void;
}

const FavoriteWeatherCard = ({ favorite, onRemove }: FavoriteWeatherCardProps) => {
  const { data: weather, isLoading, error } = useWeather(favorite.city);

  if (isLoading) {
    return (
      <div className="animate-pulse bg-white rounded-lg shadow-md p-6">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-sky-900">{favorite.city}</h3>
        <p className="text-red-500">Error loading weather data</p>
        <Button
          onClick={onRemove}
          className="mt-4 w-full bg-red-500 hover:bg-red-600"
        >
          Remove
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <WeatherCard weather={weather} />
      <Button
        onClick={onRemove}
        className="mt-4 w-full bg-red-500 hover:bg-red-600"
      >
        Remove from Favorites
      </Button>
    </div>
  );
}; 