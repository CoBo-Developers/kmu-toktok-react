import { getCookie } from '../utils/cookieManage';

const registerApi = async (name, studentId) => {
    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getCookie('accessToken')}`,
        },
        body: JSON.stringify({
            name : name,
            studentId: studentId,
        }),
    });

    if (!res.ok) {
        const message = await res.text();
        throw new Error(message);
    }
    
    return res.json();
}
export { registerApi };
