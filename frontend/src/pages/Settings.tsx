import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Card from '../components/common/Card';
import { useSettings } from '../hooks/useSettings';

const settingsSchema = z.object({
  temperatureUnit: z.enum(['C', 'F']),
  theme: z.enum(['light', 'dark']),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

const Settings: React.FC = () => {
  const { settings, updateSettings } = useSettings();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings,
  });

  const onSubmit = async (data: SettingsFormData) => {
    await updateSettings(data);
  };

  return (
    <Card>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Temperature Unit
          </label>
          <select
            {...register('temperatureUnit')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-blue-primary"
          >
            <option value="C">Celsius</option>
            <option value="F">Fahrenheit</option>
          </select>
          {errors.temperatureUnit && (
            <p className="mt-1 text-sm text-red-500">{errors.temperatureUnit.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Theme
          </label>
          <select
            {...register('theme')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-blue-primary"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          {errors.theme && (
            <p className="mt-1 text-sm text-red-500">{errors.theme.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-sky-blue-primary text-white py-2 px-4 rounded-lg hover:bg-sky-blue-secondary transition-colors duration-300"
        >
          {isSubmitting ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </Card>
  );
};

export default Settings; 