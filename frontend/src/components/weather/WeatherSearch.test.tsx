import { render, screen, fireEvent, waitFor } from '../../test-utils';
import WeatherSearch from './WeatherSearch';

describe('WeatherSearch', () => {
  it('renders search input and button', () => {
    render(<WeatherSearch onSearch={() => {}} />);
    
    expect(screen.getByLabelText('City')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Search');
  });

  it('shows loading state', () => {
    render(<WeatherSearch onSearch={() => {}} isLoading={true} />);
    
    expect(screen.getByRole('button')).toHaveTextContent('Searching...');
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onSearch with entered city', async () => {
    const handleSearch = jest.fn();
    render(<WeatherSearch onSearch={handleSearch} />);
    
    const input = screen.getByLabelText('City');
    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.submit(screen.getByRole('search'));
    
    await waitFor(() => {
      expect(handleSearch).toHaveBeenCalledWith('London');
    });
  });

  it('shows validation error for short city name', async () => {
    render(<WeatherSearch onSearch={() => {}} />);
    
    const input = screen.getByLabelText('City');
    fireEvent.change(input, { target: { value: 'L' } });
    fireEvent.submit(screen.getByRole('search'));
    
    await waitFor(() => {
      expect(screen.getByText('City name must be at least 2 characters')).toBeInTheDocument();
    });
  });

  it('clears validation error when input is valid', async () => {
    render(<WeatherSearch onSearch={() => {}} />);
    
    const input = screen.getByLabelText('City');
    
    // First enter invalid input
    fireEvent.change(input, { target: { value: 'L' } });
    fireEvent.submit(screen.getByRole('search'));
    
    await waitFor(() => {
      expect(screen.getByText('City name must be at least 2 characters')).toBeInTheDocument();
    });
    
    // Then enter valid input
    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.submit(screen.getByRole('search'));
    
    await waitFor(() => {
      expect(screen.queryByText('City name must be at least 2 characters')).not.toBeInTheDocument();
    });
  });

  it('handles empty input submission', async () => {
    const handleSearch = jest.fn();
    render(<WeatherSearch onSearch={handleSearch} />);
    
    fireEvent.submit(screen.getByRole('search'));
    
    await waitFor(() => {
      expect(handleSearch).not.toHaveBeenCalled();
    });
  });

  it('disables button during loading', () => {
    render(<WeatherSearch onSearch={() => {}} isLoading={true} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Searching...');
  });

  it('enables button after loading', () => {
    const { rerender } = render(<WeatherSearch onSearch={() => {}} isLoading={true} />);
    
    expect(screen.getByRole('button')).toBeDisabled();
    
    rerender(<WeatherSearch onSearch={() => {}} isLoading={false} />);
    
    expect(screen.getByRole('button')).not.toBeDisabled();
    expect(screen.getByRole('button')).toHaveTextContent('Search');
  });
}); 