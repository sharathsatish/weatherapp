import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { weatherApi, FavoriteLocation } from '../services/api';
import { toast } from 'react-toastify';

export const useFavorites = () => {
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery<FavoriteLocation[]>({
    queryKey: ['favorites'],
    queryFn: weatherApi.getFavorites,
  });

  const addFavoriteMutation = useMutation({
    mutationFn: ({ city, country }: { city: string; country: string }) =>
      weatherApi.addFavorite(city, country),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast.success('Location added to favorites');
    },
    onError: () => {
      toast.error('Failed to add location to favorites');
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: (id: string) => weatherApi.removeFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      toast.success('Location removed from favorites');
    },
    onError: () => {
      toast.error('Failed to remove location from favorites');
    },
  });

  return {
    favorites: favoritesQuery.data || [],
    isLoading: favoritesQuery.isLoading,
    addFavorite: addFavoriteMutation.mutate,
    removeFavorite: removeFavoriteMutation.mutate,
  };
}; 