import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { weatherApi } from '../services/api';
import { toast } from 'react-toastify';

export const useSettings = () => {
  const queryClient = useQueryClient();

  const settingsQuery = useQuery({
    queryKey: ['settings'],
    queryFn: weatherApi.getSettings,
  });

  const updateSettingsMutation = useMutation({
    mutationFn: (settings: { temperatureUnit: 'C' | 'F' }) =>
      weatherApi.updateSettings(settings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success('Settings updated successfully');
    },
    onError: () => {
      toast.error('Failed to update settings');
    },
  });

  return {
    settings: settingsQuery.data || { temperatureUnit: 'C' },
    isLoading: settingsQuery.isLoading,
    updateSettings: updateSettingsMutation.mutate,
  };
}; 