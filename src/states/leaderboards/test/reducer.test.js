import { describe, expect, it } from 'vitest';
import leaderboardsReducer from '../reducer';

describe('leaderboardsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = leaderboardsReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the leaderboards when given by RECEIVE_LEADERBOARDS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'leaderboards/recieve',
      payload: {
        leaderboards: [
          {
            'user': {
              'id': 'users-1',
              'name': 'John Doe',
              'email': 'john@example.com',
              'avatar': 'https://generated-image-url.jpg'
            },
            'score': 10
          },
          {
            'user': {
              'id': 'users-2',
              'name': 'Jane Doe',
              'email': 'jane@example.com',
              'avatar': 'https://generated-image-url.jpg'
            },
            'score': 5
          }
        ],
      },
    };

    // action
    const nextState = leaderboardsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.leaderboards);
  });


});