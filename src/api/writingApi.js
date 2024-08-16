const getWritingList = async (accessToken) => {
    const res = await fetch(import.meta.env.VITE_APP_WRITING_API_URL + '/api/student/list', {
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

const getWriting = async (accessToken,assignmentId) => {
    const res = await fetch(`${import.meta.env.VITE_APP_WRITING_API_URL}/api/student?assignmentId=${assignmentId}`, {
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

const postWriting = async (accessToken,assignmentId, writingState, content) => {
    const res = await fetch(import.meta.env.VITE_APP_WRITING_API_URL + '/api/student', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ 
        assignmentId: assignmentId,
        writingState: writingState,
        content: content,
      }),
    });
  
    if (!res.ok) {
      const message = (await res.json()).message;
      throw new Error(message);
    }
  
    return res.json();
}

const getFeedback = async (accessToken, assignmentId, content) => {
  const res = await fetch(import.meta.env.VITE_APP_WRITING_API_URL + '/api/student/feedback', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ 
        assignmentId: assignmentId,
        content: content,
      }),
    });

    if (!res.ok) {
      const message = (await res.json()).message;
      throw new Error(message);
    }

    return res.json();
}

export { getWritingList, getWriting, postWriting, getFeedback };