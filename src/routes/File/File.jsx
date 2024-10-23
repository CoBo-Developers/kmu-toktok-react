import './File.css';
import downloadIcon from '../../assets/icons/download-icon.png';
import { fileFormattedDate } from '../../utils/dateAndTime';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import useFile from './hooks/useFile';

function File() {
    const {
        fileData,
        isLoading,
        handleDownload,
        getCategoryColor,
        isNewFile,
    } = useFile();

    return (
        <main className="file-main">
            <LoadingModal show={isLoading} />
            <section className="file-main-inner">
                <table className="file-table">
                    <thead>
                        <tr>
                            <th>순서</th>
                            <th className="info-column">
                                <div className="category-col">카테고리</div>
                                <div className="title-col">제목</div>
                                <div className="date-col">게시일</div>
                            </th>
                            <th>다운로드</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fileData.map((item, index) => (
                            <tr key={index}>
                                <td className="order-column">
                                    <span>{index + 1}</span>
                                </td>
                                <td className="info-column">
                                    <div className="category-col">
                                        <span className='category' style={{ backgroundColor: getCategoryColor(item.categoryId) }}>
                                            {item.categoryName}
                                        </span>
                                    </div>
                                    <div className="title-col">
                                        <span className="title-text">{item.name}</span>
                                        {isNewFile(item.createdAt) && <span className="new-badge">new</span>}
                                    </div>
                                    <div className="date-col">{fileFormattedDate(item.createdAt)}</div>
                                </td>
                                <td className="download-column">
                                    <img src={downloadIcon} className='download-btn' alt="" onClick={() => handleDownload(item.id, item.fileName)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default File;