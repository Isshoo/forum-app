import { BASE_URL, _fetchWithAuth } from '../config';

async function createComment({ threadId, content }) {
  const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content
    }),
  });

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  const { data: { comment } } = responseJson;

  return comment;
}

export {
  createComment,
};