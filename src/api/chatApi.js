const getChat = async (token) => {
  const res = await fetch(import.meta.env.VITE_APP_CHAT_API_URL + '/api/chat', {
    headers: {
      'authorization' : 'Bearer ' + token
    }
  });

  if (!res.ok) {
    const message = (await res.json()).message;
    throw new Error(message);
  }

  return res.json();
}

const postChat = async (question, token) => {
  const res = await fetch(import.meta.env.VITE_APP_CHAT_API_URL + '/api/chat', {
    method: 'POST',
    headers: {
      'authorization': 'Bearer ' + token,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      'question': question
    })
  });

  if (!res.ok) {
    const message = (await res.json()).message;
    throw new Error(message);
  }

  return res.json();
}

export { getChat, postChat };