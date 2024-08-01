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

export { getChat };