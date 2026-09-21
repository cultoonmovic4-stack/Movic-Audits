import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders children with default primary styles', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button', { name: /Click Me/i });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain('bg-[#513229]');
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button').className).toContain('bg-[#F3EFEA]');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button').className).toContain('border-[#513229]');

    rerender(<Button variant="accent">Accent</Button>);
    expect(screen.getByRole('button').className).toContain('bg-[#A5BCD6]');

    rerender(<Button variant="danger">Danger</Button>);
    expect(screen.getByRole('button').className).toContain('bg-[#DC2626]');
  });

  it('disables button and displays spinner when isLoading is true', () => {
    render(<Button isLoading>Submitting</Button>);
    const button = screen.getByRole('button', { name: /Submitting/i });
    expect(button).toBeDisabled();
    expect(button.querySelector('svg')).toBeInTheDocument();
  });
});
