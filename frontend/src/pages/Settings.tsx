import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useSettings } from '../hooks/useSettings';

const settingsSchema = z.object({
  temperatureUnit: z.enum(['celsius', 'fahrenheit']),
  refreshInterval: z.number().min(1).max(60),
  maxFavorites: z.number().min(1).max(10),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export const Settings = () => {
  const { settings, updateSettings } = useSettings();

  const handleTemperatureUnitChange = (unit: 'C' | 'F') => {
    updateSettings({ temperatureUnit: unit });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-sky-900 mb-8">Settings</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-sky-900 mb-4">Temperature Unit</h2>
        <div className="flex space-x-4">
          <Button
            onClick={() => handleTemperatureUnitChange('C')}
            className={`flex-1 ${
              settings.temperatureUnit === 'C'
                ? 'bg-sky-600 hover:bg-sky-700'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Celsius (°C)
          </Button>
          <Button
            onClick={() => handleTemperatureUnitChange('F')}
            className={`flex-1 ${
              settings.temperatureUnit === 'F'
                ? 'bg-sky-600 hover:bg-sky-700'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Fahrenheit (°F)
          </Button>
        </div>
      </div>
    </div>
  );
}; 