const loginApi = async (code, option) => {
    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/auth/${option}-local-login?code=${decodeURIComponent(code)}`);

    if (!res.ok) {
        const message = await res.json();
        throw new Error(message);
    }

    return res.json();
};


const reissueApi = async (refreshToken) => {
    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/auth/login`, {
      method: 'PATCH',
      headers: {
        Authorization: refreshToken,
      },
    });
  
    if (!res.ok) {
      const message = await res.json();
      throw new Error(message);
    }
  
    return res.json();
  };
  
  export { loginApi, reissueApi };