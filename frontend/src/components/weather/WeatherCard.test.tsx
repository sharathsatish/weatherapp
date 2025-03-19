import { render, screen, fireEvent } from '../../test-utils';
import WeatherCard from './WeatherCard';

const mockWeatherData = {
  temperature: 20.5,
  humidity: 65,
  windSpeed: 5.2,
  description: 'Partly cloudy',
  icon: '04d',
};

describe('WeatherCard', () => {
  it('renders basic weather information correctly', () => {
    render(<WeatherCard data={mockWeatherData} city="London" />);
    
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Partly cloudy')).toBeInTheDocument();
    expect(screen.getByText('21°C')).toBeInTheDocument(); // Rounded from 20.5
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('5.2 m/s')).toBeInTheDocument();
  });

  it('renders weather icon with correct URL', () => {
    render(<WeatherCard data={mockWeatherData} city="London" />);
    
    const icon = screen.getByAltText('Partly cloudy') as HTMLImageElement;
    expect(icon).toBeInTheDocument();
    expect(icon.src).toBe('http://openweathermap.org/img/wn/04d@2x.png');
  });

  it('renders favorite button when onAddToFavorites is provided', () => {
    const handleAddToFavorites = jest.fn();
    render(
      <WeatherCard
        data={mockWeatherData}
        city="London"
        onAddToFavorites={handleAddToFavorites}
      />
    );
    
    const favoriteButton = screen.getByRole('button');
    expect(favoriteButton).toBeInTheDocument();
    fireEvent.click(favoriteButton);
    expect(handleAddToFavorites).toHaveBeenCalledTimes(1);
  });

  it('does not render favorite button when onAddToFavorites is not provided', () => {
    render(<WeatherCard data={mockWeatherData} city="London" />);
    
    const favoriteButton = screen.queryByRole('button');
    expect(favoriteButton).not.toBeInTheDocument();
  });

  it('applies correct styles for favorite state', () => {
    render(
      <WeatherCard
        data={mockWeatherData}
        city="London"
        onAddToFavorites={() => {}}
        isFavorite={true}
      />
    );
    
    const favoriteButton = screen.getByRole('button');
    expect(favoriteButton).toHaveClass('text-yellow-400');
    expect(favoriteButton).toHaveClass('hover:text-yellow-500');
  });

  it('applies correct styles for non-favorite state', () => {
    render(
      <WeatherCard
        data={mockWeatherData}
        city="London"
        onAddToFavorites={() => {}}
        isFavorite={false}
      />
    );
    
    const favoriteButton = screen.getByRole('button');
    expect(favoriteButton).toHaveClass('text-gray-400');
    expect(favoriteButton).toHaveClass('hover:text-sky-blue-primary');
  });

  it('renders all weather metrics with correct labels', () => {
    render(<WeatherCard data={mockWeatherData} city="London" />);
    
    expect(screen.getByText('Temperature')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('Wind Speed')).toBeInTheDocument();
  });

  it('rounds temperature to nearest integer', () => {
    const data = { ...mockWeatherData, temperature: 20.7 };
    render(<WeatherCard data={data} city="London" />);
    
    expect(screen.getByText('21°C')).toBeInTheDocument();
  });
}); 