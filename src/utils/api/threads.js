import { BASE_URL, _fetchWithAuth } from '../config';

async function getAllThreads() {
  const response = await fetch(`${BASE_URL}/threads`);

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  const { data: { threads } } = responseJson;

  return threads;
}

async function getThreadDetail(id) {
  const response = await fetch(`${BASE_URL}/threads/${id}`);

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  const { data: { detailThread } } = responseJson;

  return detailThread;
}

async function createThread({ title, body, category = '' }) {
  const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      body,
      category
    }),
  });

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== 'success') {
    throw new Error(message);
  }

  const { data: { thread } } = responseJson;

  return thread;
}

export {
  getAllThreads,
  getThreadDetail,
  createThread,
};