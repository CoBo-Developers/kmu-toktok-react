export const writingStateEnum = {
    NOT_SUBMITTED: {
        text: '',
        className: 'not-submitted',
        state: 0
    },
    SUBMITTED: {
        text: '제출완료',
        className: 'submitted',
        state: 1
    },
    NOT_APPROVED: {
        text: '부정제출',
        className: 'not-approved',
        state: 2
    },
    APPROVED: {
        text: '채점됨',
        className: 'approved',
        state: 3
    },
    EXPIRED: {
        text: '미제출',
        className: 'expired',
        state: 4
    },
};