import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input';

describe('Input Component', () => {
  // Test 1: Basic Rendering
  it('renders input with correct attributes', () => {
    render(
      <Input
        name="test-input"
        placeholder="Enter text"
        label="Test Input"
      />
    );

    const input = screen.getByLabelText('Test Input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'test-input');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
  });

  // Test 2: Required Field
  it('shows required indicator when field is required', () => {
    render(
      <Input
        name="required-input"
        label="Required Field"
        required
      />
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  // Test 3: Error State
  it('displays error message when error is provided', () => {
    const errorMessage = 'This field is required';
    render(
      <Input
        name="error-input"
        label="Error Input"
        error={errorMessage}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
  });

  // Test 4: Value Changes
  it('handles value changes correctly', () => {
    const handleChange = jest.fn();
    render(
      <Input
        name="change-input"
        label="Change Input"
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText('Change Input');
    fireEvent.change(input, { target: { value: 'test value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  // Test 5: Different Types
  it('supports different input types', () => {
    const { rerender } = render(
      <Input
        name="text-input"
        label="Text Input"
        type="text"
      />
    );
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');

    rerender(
      <Input
        name="number-input"
        label="Number Input"
        type="number"
      />
    );
    expect(screen.getByLabelText('Number Input')).toHaveAttribute('type', 'number');

    rerender(
      <Input
        name="password-input"
        label="Password Input"
        type="password"
      />
    );
    expect(screen.getByLabelText('Password Input')).toHaveAttribute('type', 'password');
  });

  // Test 6: Disabled State
  it('handles disabled state correctly', () => {
    render(
      <Input
        name="disabled-input"
        label="Disabled Input"
        disabled
      />
    );

    const input = screen.getByLabelText('Disabled Input');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('bg-gray-100', 'cursor-not-allowed');
  });

  // Test 7: Helper Text
  it('displays helper text when provided', () => {
    const helperText = 'This is a helpful message';
    render(
      <Input
        name="helper-input"
        label="Input with Helper"
        helperText={helperText}
      />
    );

    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  // Test 8: Focus Handling
  it('applies focus styles correctly', () => {
    render(
      <Input
        name="focus-input"
        label="Focus Input"
      />
    );

    const input = screen.getByLabelText('Focus Input');
    fireEvent.focus(input);
    expect(input).toHaveClass('focus:ring-2', 'focus:ring-sky-blue-primary');
  });

  // Test 9: Blur Handling
  it('handles blur events correctly', () => {
    const handleBlur = jest.fn();
    render(
      <Input
        name="blur-input"
        label="Blur Input"
        onBlur={handleBlur}
      />
    );

    const input = screen.getByLabelText('Blur Input');
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  // Test 10: Custom Classes
  it('applies custom classes correctly', () => {
    render(
      <Input
        name="custom-input"
        label="Custom Input"
        className="custom-class"
      />
    );

    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });
}); 