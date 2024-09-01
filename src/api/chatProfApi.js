const getChat= async (accessToken) => {
    const res = await fetch(`${import.meta.env.VITE_APP_CHAT_API_URL}/api/student`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    if (!res.ok) {
      const message = await res.json();
      throw new Error(message);
    }
  
    return res.json();
};

const postChat = async (accessToken, comment) => {
    const res = await fetch(`${import.meta.env.VITE_APP_CHAT_API_URL}/api/student`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: comment }),
    });
  
    if (!res.ok) {
      const message = await res.json();
      throw new Error(message);
    }
  
    return res.json();
}

export { getChat, postChat };