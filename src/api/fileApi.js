const getCategoryList = async (accessToken) => {
  const res = await fetch(import.meta.env.VITE_APP_FILE_API_URL + '/api/student/category/list', {
    headers: {
      method: 'GET',
      Authorization: `Bearer ${accessToken}`,
    }
  });

  if (!res.ok) {
    const message = (await res.json()).message;
    throw new Error(message);
  }

  return res.json();
}
const getFileList = async (accessToken, categoryId) => {
  const res = await fetch(`${import.meta.env.VITE_APP_FILE_API_URL}/api/file/list?categoryId=${categoryId}`, {
    headers: {
      method: 'GET',
      Authorization: `Bearer ${accessToken}`,
    }
  });

  if (!res.ok) {
    const message = (await res.json()).message;
    throw new Error(message);
  }
  
  return res.json();
}

const fileDownload = async (accessToken, fileId) => {
  const res = await fetch(`${import.meta.env.VITE_APP_FILE_API_URL}/api/file?fileId=${fileId}`, {
    headers: {
      method: 'GET',
      Authorization: `Bearer ${accessToken}`,
    }
  });

  if (!res.ok) {
    const message = (await res.json()).message;
    throw new Error(message);
  }

  return res.blob();
}

export { getCategoryList, getFileList, fileDownload };