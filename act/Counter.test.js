/**
 * NOTE: Ee file ni run cheyadaniki, mee project lo oka testing setup undali.
 * Common ga, deeniki ee kindi libraries install chesi undali:
 * - jest (test runner)
 * - @testing-library/react (React components ni test cheyadaniki)
 * - @testing-library/jest-dom (extra matchers like .toBeInTheDocument())
 * - jest-environment-jsdom (tests ni browser environment lo simulate cheyadaniki)
 *
 * Ee file kevalam `act` ni ela vadalo chupinche example matrame.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react'; // We'll use this explicitly for the async test
import Counter from './Counter';

// Jest's fake timers allow us to control setTimeout in our tests
jest.useFakeTimers();

describe('Counter Component', () => {
  // --- Test 1: The Right Way (Synchronous) using React Testing Library ---
  test('increments the counter when the button is clicked (RTL handles act)', () => {
    // 1. Arrange
    render(<Counter />);
    const button = screen.getByText('Increment');
    const label = screen.getByText(/Count:/);

    expect(label).toHaveTextContent('Count: 0');
    expect(document.title).toBe('Count is 0');

    // 2. Act
    // React Testing Library's `fireEvent` is already wrapped in `act`!
    // So, we don't need to wrap it manually. It's the "invisible" act.
    fireEvent.click(button);

    // 3. Assert
    // Ee line ki vachhe sariki, RTL loni `act` valla, state update and
    // effect anni complete aipoyayi ani manaki guarantee untundi.
    expect(label).toHaveTextContent('Count: 1');
    expect(document.title).toBe('Count is 1');
  });

  // --- Test 2: The Right Way (Asynchronous) using async act ---
  test('increments the counter asynchronously', async () => {
    // 1. Arrange
    render(<Counter />);
    const asyncButton = screen.getByText('Increment Async');
    const label = screen.getByText(/Count:/);

    expect(label).toHaveTextContent('Count: 0');

    // 2. Act
    // Idi oka async operation kabatti, manam `async act` vadali.
    await act(async () => {
      fireEvent.click(asyncButton);
      // Ippudu, `setTimeout` queue lo undi. Manam daanini run cheyyali.
      // jest.advanceTimersByTime tells Jest to fast-forward time.
      jest.advanceTimersByTime(500);
    });

    // 3. Assert
    // `await act` complete ayyaka, timeout loni state update kuda
    // complete aipoindi ani manaki guarantee untundi.
    expect(label).toHaveTextContent('Count: 1');
    expect(document.title).toBe('Count is 1');
  });

});