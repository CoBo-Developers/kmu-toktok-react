
const registerApi = async (name, studentId, accessToken) => {
    const res = await fetch(`${import.meta.env.VITE_APP_AUTH_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            name : name,
            studentId: studentId,
        }),
    });

    if (!res.ok) {
        const message = await res.json();
        throw new Error(message);
    }

    return res.json();
}
export { registerApi };
