import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button Component', () => {
  // Test 1: Basic Rendering
  it('renders button with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  // Test 2: Variants
  it('applies correct styles for different variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-sky-blue-primary');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-sky-blue-secondary');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-sky-blue-primary');
  });

  // Test 3: Disabled State
  it('handles disabled state correctly', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  // Test 4: Loading State
  it('shows loading state correctly', () => {
    render(<Button isLoading>Loading Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('cursor-wait');
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  // Test 5: Click Handler
  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test 6: Accessibility
  it('maintains accessibility attributes', () => {
    render(
      <Button 
        aria-label="Custom label"
        data-testid="test-button"
      >
        Button Text
      </Button>
    );
    
    const button = screen.getByTestId('test-button');
    expect(button).toHaveAttribute('aria-label', 'Custom label');
    expect(button).toHaveAttribute('type', 'button');
  });

  // Test 7: Size Variants
  it('applies correct size classes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-3', 'py-1.5', 'text-sm');

    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-4', 'py-2', 'text-base');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-6', 'py-3', 'text-lg');
  });

  // Test 8: Icon Support
  it('renders with icon when provided', () => {
    render(
      <Button icon={<span data-testid="test-icon">★</span>}>
        With Icon
      </Button>
    );
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('inline-flex', 'items-center');
  });

  // Test 9: Custom Class Names
  it('applies custom class names correctly', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  // Test 10: Button Types
  it('handles different button types correctly', () => {
    const { rerender } = render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');

    rerender(<Button type="reset">Reset</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
  });

  // Test 11: Loading State Disables Button
  it('disables button when in loading state', () => {
    render(<Button isLoading>Loading Button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  // Test 12: Focus Styles
  it('applies focus styles correctly', () => {
    render(<Button>Focus Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-sky-blue-primary', 'focus:ring-offset-2');
  });

  // Test 13: Hover Styles
  it('applies hover styles correctly', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('hover:bg-sky-blue-secondary');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('hover:bg-sky-blue-primary');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass('hover:bg-sky-blue-primary', 'hover:text-white');
  });

  // Test 14: Loading State with Icon
  it('shows loading spinner and text when loading with icon', () => {
    render(
      <Button isLoading icon={<span>★</span>}>
        Loading with Icon
      </Button>
    );
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
}); 