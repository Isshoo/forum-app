import { BASE_URL, _fetchWithAuth } from '../config';
async function upVoteComment({ threadId, commentId }) {
  const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
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
async function downVoteComment({ threadId, commentId }) {
  const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
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
async function neutralizeVoteComment({ threadId, commentId }) {
  const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
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
  upVoteComment,
  downVoteComment,
  neutralizeVoteComment,
};