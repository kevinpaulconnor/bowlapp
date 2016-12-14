export const REQUEST_SCORES = 'REQUEST_SCORES';

export function requestScores() {
  return {
    type: REQUEST_SCORES,
    // hardcoded for testing
    payload: {66:30, 69:27, 22:0,53:0}
  }
}