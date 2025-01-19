/**
 * skenario testing
 *
 * - SearchThreadForm component
 *   - should handle search input typing correctly
 */

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import SearchThreadForm from '../SearchThreadForm';

expect.extend(matchers);

describe('SearchThreadForm component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle search input typing correctly', async () => {
    // eslint-disable-next-line prefer-const
    let keyword;
    // Arrange
    render(<SearchThreadForm keyword={keyword} keywordChange={() => {}} locale="EN" />);
    const searchInput = await screen.getByPlaceholderText('Search title...');
    // Action
    await userEvent.type(searchInput, 'titletest');
    // Assert
    keyword = 'titletest';
    expect(searchInput).toHaveValue(keyword);
  });
});
