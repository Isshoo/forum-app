import { BASE_URL, _fetchWithAuth } from '../config';
async function upVoteThread({ threadId }) {
  const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/up-vote`, {
    method: 'POST',
  });

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  const { data: { vote } } = responseJson;

  return vote;
}
async function downVoteThread({ threadId }) {
  const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/down-vote`, {
    method: 'POST',
  });

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  const { data: { vote } } = responseJson;

  return vote;
}
async function neutralizeVoteThread({ threadId }) {
  const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
    method: 'POST',
  });

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  const { data: { vote } } = responseJson;

  return vote;
}

export {
  upVoteThread,
  downVoteThread,
  neutralizeVoteThread,
};