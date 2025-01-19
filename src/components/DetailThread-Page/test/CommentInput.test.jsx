/**
 * skenario testing
 *
 * - CommentInput component
 *   - should handle content typing correctly
 *   - should call onAddComment function when Submit button is clicked
 */

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import CommentInput from '../CommentInput';

expect.extend(matchers);

describe('CommentInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle content typing correctly', async () => {
    // Arrange
    render(<CommentInput onAddComment={() => {}} locale="EN" />);
    const contentDiv = screen.getByTestId('Comment');

    // Action
    await userEvent.type(contentDiv, 'contenttest');

    // Assert
    expect(contentDiv).toHaveTextContent('contenttest');
  });

  it('should call onAddComment function when Submit button is clicked', async () => {
    // Arrange
    const mockAddThread = vi.fn();
    render(<CommentInput onAddComment={mockAddThread} locale="EN" />);
    const contentDiv = screen.getByTestId('Comment');
    await userEvent.type(contentDiv, 'contenttest');
    const addCommentButton = await screen.getByRole('button', { name: 'Submit' });

    const content = 'contenttest';

    // Action
    await userEvent.click(addCommentButton);

    // Assert
    expect(mockAddThread).toBeCalledWith(content);
  });
});
