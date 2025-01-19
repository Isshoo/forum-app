/**
 * skenario testing
 *
 * - FormAddThread component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle description typing correctly
 *   - should call addThread function when add button is clicked
 */

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import FormAddThread from '../FormAddThread';

expect.extend(matchers);

describe('FormAddThread component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // Arrange
    render(<FormAddThread addThread={() => {}} locale="EN" />);
    const titleInput = await screen.getByPlaceholderText('Title');

    // Action
    await userEvent.type(titleInput, 'titletest');

    // Assert
    expect(titleInput).toHaveValue('titletest');
  });

  it('should handle category typing correctly', async () => {
    // Arrange
    render(<FormAddThread addThread={() => {}} locale="EN" />);
    const categoryInput = await screen.getByPlaceholderText('Category');

    // Action
    await userEvent.type(categoryInput, 'categorytest');

    // Assert
    expect(categoryInput).toHaveValue('categorytest');
  });

  it('should handle description typing correctly', async () => {
    // Arrange
    render(<FormAddThread addThread={() => {}} locale="EN" />);
    const descriptionDiv = screen.getByTestId('Description');

    // Action
    await userEvent.type(descriptionDiv, 'descriptiontest');

    // Assert
    expect(descriptionDiv).toHaveTextContent('descriptiontest');
  });

  it('should call addThread function when addThread button is clicked', async () => {
    // Arrange
    const mockAddThread = vi.fn();
    render(<FormAddThread addThread={mockAddThread} locale="EN" />);
    const titleInput = await screen.getByPlaceholderText('Title');
    await userEvent.type(titleInput, 'titletest');
    const categoryInput = await screen.getByPlaceholderText('Category');
    await userEvent.type(categoryInput, 'categorytest');
    const descriptionDiv = screen.getByTestId('Description');
    await userEvent.type(descriptionDiv, 'descriptiontest');
    const addThreadButton = await screen.getByRole('button', { name: 'Add' });

    // Action
    await userEvent.click(addThreadButton);

    // Assert
    expect(mockAddThread).toBeCalledWith({
      title: 'titletest',
      category: 'categorytest',
      body: 'descriptiontest',
    });
  });
});
