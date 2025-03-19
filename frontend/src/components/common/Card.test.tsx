import { render, screen } from '../../test-utils';
import Card from './Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <div>Test Content</div>
      </Card>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Card className="custom-class">
        <div>Test Content</div>
      </Card>
    );
    const card = screen.getByText('Test Content').parentElement;
    expect(card).toHaveClass('custom-class');
  });

  it('renders with default styles', () => {
    render(
      <Card>
        <div>Test Content</div>
      </Card>
    );
    const card = screen.getByText('Test Content').parentElement;
    expect(card).toHaveClass('bg-white');
    expect(card).toHaveClass('rounded-lg');
    expect(card).toHaveClass('shadow-md');
    expect(card).toHaveClass('p-6');
  });

  it('renders with title and subtitle', () => {
    render(
      <Card title="Test Title" subtitle="Test Subtitle">
        <div>Test Content</div>
      </Card>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders with only title', () => {
    render(
      <Card title="Test Title">
        <div>Test Content</div>
      </Card>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.queryByText('Test Subtitle')).not.toBeInTheDocument();
  });

  it('renders with only subtitle', () => {
    render(
      <Card subtitle="Test Subtitle">
        <div>Test Content</div>
      </Card>
    );
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders with multiple children', () => {
    render(
      <Card>
        <div>First Child</div>
        <div>Second Child</div>
      </Card>
    );
    expect(screen.getByText('First Child')).toBeInTheDocument();
    expect(screen.getByText('Second Child')).toBeInTheDocument();
  });

  it('renders title and subtitle with correct styles', () => {
    render(
      <Card title="Test Title" subtitle="Test Subtitle">
        <div>Test Content</div>
      </Card>
    );
    const title = screen.getByText('Test Title');
    const subtitle = screen.getByText('Test Subtitle');
    
    expect(title).toHaveClass('text-lg', 'font-semibold', 'text-gray-900');
    expect(subtitle).toHaveClass('text-sm', 'text-gray-500', 'mt-1');
  });
}); 