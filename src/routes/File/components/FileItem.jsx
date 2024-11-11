/* eslint-disable react/prop-types */
import downloadIcon from '../../../assets/icons/download-icon.svg';
import { fileFormattedDate } from '../../../utils/dateAndTime';
import './FileItem.css';

const FileItem = ({ item, index, handleDownload, getCategoryColor, isNewFile }) => (
  <tr>
    <td className="order-column">
      <span>{index + 1}</span>
    </td>
    <td className="info-column">
      <div className="category-col">
        <span
          className="category"
          style={{
            backgroundColor: getCategoryColor(item.categoryId),
          }}
        >
          {item.categoryName}
        </span>
      </div>
      <div className="title-col">
        <span className="title-text">{item.name}</span>
        {isNewFile(item.createdAt) && (
          <span className="new-badge">new</span>
        )}
      </div>
      <div className="date-col">
        {fileFormattedDate(item.createdAt)}
      </div>
    </td>
    <td className="download-column">
      <img
        src={downloadIcon}
        className="download-btn"
        alt=""
        onClick={() => handleDownload(item.id, item.fileName)}
      />
    </td>
  </tr>
);

export default FileItem;
