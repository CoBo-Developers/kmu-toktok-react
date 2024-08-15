/* eslint-disable react/prop-types */
import './WritingItem.css';

const WritingItem = ({ item, onClick}) => {
    const getStateText = (writingState) => {
        switch (writingState) {
            case 0:
                return { text: '', className: 'not-submitted' };
            case 1:
                return { text: '제출완료', className: 'submitted' };
            case 2:
                return { text: '부정제출', className: 'not-approved' };
            case 3:
                return { text: '제출승인', className: 'approved' };
        }
    };

    const { text, className } = getStateText(item.writingState);

    return (
        <li className={`writing-item ${className}`} onClick={onClick}>
            <h3 className="writing-week">{item.title}</h3>
            <div className='writing-state'>
                <span className='writing-state-title'>{text}</span>
                <span className={`writing-state-color ${className}`}></span>
            </div>
        </li>
    );
}

export default WritingItem;
