import { BASE_URL } from '../config';

async function getLeaderboards() {
  const response = await fetch(`${BASE_URL}/leaderboards`);

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  const { data: { leaderboards } } = responseJson;

  return leaderboards;
}

export { getLeaderboards };