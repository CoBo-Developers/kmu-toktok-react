const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', options);
}
  
const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
}

const formatAssignmentTime = (fromDate, toDate) => {
    const getFormattedDate = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        const dayName = dayOfWeek[date.getDay()];

        return `${year}.${month}.${day}(${dayName})`;
    };

    const from = getFormattedDate(fromDate);
    const to = getFormattedDate(toDate);

    return `${from} - ${to}`;
};

const fileFormattedDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    };

    return new Intl.DateTimeFormat('ko-KR', options).format(date);
}

export { formatDate, formatTime, formatAssignmentTime, fileFormattedDate };