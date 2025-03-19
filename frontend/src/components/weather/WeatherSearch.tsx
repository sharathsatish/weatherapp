import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '../common/Input';
import Button from '../common/Button';
import { FaSearch } from 'react-icons/fa';

const searchSchema = z.object({
  city: z.string().min(1, 'City name is required'),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface WeatherSearchProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ onSearch, isLoading = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data: SearchFormData) => {
    onSearch(data.city);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <Input
          {...register('city')}
          placeholder="Enter city name"
          error={errors.city?.message}
          className="flex-grow"
        />
        <Button
          type="submit"
          isLoading={isLoading}
          className="flex items-center justify-center"
        >
          <FaSearch className="mr-2" />
          Search
        </Button>
      </div>
    </form>
  );
};

export default WeatherSearch; 