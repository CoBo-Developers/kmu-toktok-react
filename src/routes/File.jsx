import './File.css';
import downloadIcon from '../assets/icons/download-icon.svg';
import { useState, useEffect } from 'react'; 
import { useCookies } from 'react-cookie';
import { getFileList, getCategoryList, fileDownload } from '../api/fileApi';
import { fileFormattedDate } from '../utils/dateAndTime';
import { useCategoryStore, useSelectedCategoryIdStore } from '../store/useFileStore';
import LoadingModal from '../components/LoadingModal/LoadingModal';

function File() {
    const [cookies] = useCookies(['accessToken']);
    const [fileData, setFileData] = useState([]);
    const [allFileData, setAllFileData] = useState([]);
    const [categoryIdList, setCategoryIdList] = useState([]);

    const selectedCategoryId = useSelectedCategoryIdStore((state) => state.selectedCategoryId);

    const { categoryList, setCategoryList } = useCategoryStore((state) => ({
        categoryList: state.categoryList,
        setCategoryList: state.setCategoryList
    }));

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getCategoryList(cookies.accessToken)
            .then((response) => {
                setCategoryIdList(response.data.categories.map((category) => category.id));
                response.data.categories.forEach((category) => {
                    setCategoryList(category.id, category.name);
                });
            })
            .catch((error) => {
                alert(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [cookies.accessToken]);

    useEffect(() => {
        categoryIdList.forEach((categoryId) => {
            setIsLoading(true);
            getFileList(cookies.accessToken, categoryId)
                .then((response) => {
                    const filesWithCategoryId = response.data.files.map(file => ({
                        ...file,
                        categoryId
                    }));
    
                    setAllFileData((prevData) => {
                        const existingIds = new Set(prevData.map(file => file.id));
                        const newFiles = filesWithCategoryId.filter(file => !existingIds.has(file.id));
                        return [...prevData, ...newFiles];
                    });
                })
                .catch((error) => {
                    alert(error.message);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        });
    }, [cookies.accessToken, categoryIdList]);
    
    
    useEffect(() => {
        if (selectedCategoryId === 0 || selectedCategoryId === null) {
            const sortedFiles = [...allFileData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setFileData(sortedFiles);
        } else {
            const filteredFiles = allFileData
                .filter(file => file.categoryId === selectedCategoryId)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setFileData(filteredFiles);
        }
    }, [cookies.accessToken, selectedCategoryId, allFileData]);

    const getCategoryColor = (categoryId) => {
        const category = categoryList.find(cat => cat.id === categoryId);
        return category ? category.color : 'transparent';
    };

    const handleDownload = (fileId, fileName) => {
        setIsLoading(true);
        fileDownload(cookies.accessToken, fileId)
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            })
            .catch((error) => {
                alert(`Download failed: ${error.message}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    
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
                                        {categoryList.find(cat => cat.id === item.categoryId)?.name}
                                        </span>
                                    </div>
                                    <div className="title-col">{item.name}</div>
                                    <div className="date-col">{fileFormattedDate(item.createdAt)}</div>
                                </td>
                                <td className="download-column">
                                    <img src={downloadIcon} className='download-btn' alt="" onClick={() => handleDownload(item.id, item.fileName)}/>
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
