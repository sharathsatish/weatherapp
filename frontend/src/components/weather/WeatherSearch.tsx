import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../common/Input';

interface WeatherSearchProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

const searchSchema = z.object({
  city: z.string().min(2, 'City name must be at least 2 characters'),
});

type SearchFormData = z.infer<typeof searchSchema>;

const WeatherSearch: React.FC<WeatherSearchProps> = ({ onSearch, isLoading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      city: '',
    },
  });

  const onSubmit = handleSubmit((data: SearchFormData) => {
    onSearch(data.city);
  });

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md mx-auto" role="search">
      <div className="flex gap-2">
        <Input
          label="City"
          {...register('city')}
          error={errors.city?.message}
          placeholder="Enter city name..."
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-sky-blue-primary text-white rounded-lg hover:bg-sky-blue-secondary transition-colors duration-300"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
};

export default WeatherSearch; 