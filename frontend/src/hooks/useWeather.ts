import { useQuery } from '@tanstack/react-query';
import { weatherApi, WeatherData } from '../services/api';

export const useWeather = (city: string) => {
  return useQuery<WeatherData>({
    queryKey: ['weather', city],
    queryFn: () => weatherApi.getCurrentWeather(city),
    enabled: !!city,
  });
};