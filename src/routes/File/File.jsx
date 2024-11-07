import './File.css';
import FileItem from './components/FileItem';
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
            <FileItem
              key={index}
              item={item}
              index={index}
              handleDownload={handleDownload}
              getCategoryColor={getCategoryColor}
              isNewFile={isNewFile}
            />
          ))}
        </tbody>
      </table>
    </section>
  </main>
  );
}

export default File;