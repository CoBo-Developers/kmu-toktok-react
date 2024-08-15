/* eslint-disable react/prop-types */
import './WritingItem.css';
import { writingStateEnum} from '../../../utils/writingEnum';

const WritingItem = ({ item, onClick}) => {
    const state = Object.values(writingStateEnum).find(state => state.state === item.writingState) || {};

    const { text = '', className = '' } = state;

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
