/* eslint-disable react/prop-types */
import "./WritingItem.css";
import { writingStateEnum } from "../../../utils/writingEnum";
import { parseDateString } from "../../../utils/dateAndTime";

const WritingItem = ({ item, onClick }) => {
  const now = new Date();
  const endDate = parseDateString(item.endDate).setDate(parseDateString(item.endDate).getDate() + 1);
  if (item.writingState === 0 && endDate < now) {
    item.writingState = 4;
  }
  const state = Object.values(writingStateEnum).find((state) => state.state === item.writingState) || {};

  const { text = "", className = "" } = state;

  return (
    <li className={`writing-item ${className}`} onClick={onClick}>
      <h3 className="writing-week">{item.title}</h3>
      <div className="writing-state">
        <span className="writing-state-title">{text}</span>
        <span className={`writing-state-color ${className}`}></span>
      </div>
    </li>
  );
};

export default WritingItem;
