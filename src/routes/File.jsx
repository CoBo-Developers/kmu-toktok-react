import './File.css';
import downloadIcon from '../assets/icons/download-icon.png';
import { useState, useEffect } from 'react'; 
import { useCookies } from 'react-cookie';
import { getFileList, getCategoryList, fileDownload } from '../api/fileApi';
import { fileFormattedDate } from '../utils/dateAndTime';
import { useCategoryStore, useSelectedCategoryIdStore } from '../store/useFileStore';

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

    useEffect(() => {
        getCategoryList(cookies.accessToken)
            .then((response) => {
                setCategoryIdList(response.data.categories.map((category) => category.id));
                response.data.categories.forEach((category) => {
                    setCategoryList(category.id, category.name);
                });
            })
            .catch((error) => {
                alert(error.message);
            });
    }, [cookies.accessToken, setCategoryList]);

    useEffect(() => {
        categoryIdList.forEach((categoryId) => {
            getFileList(cookies.accessToken, categoryId)
                .then((response) => {
                    const filesWithCategoryId = response.data.files.map(file => ({
                        ...file,
                        categoryId
                    }));
    
                    setAllFileData((prevData) => [...prevData, ...filesWithCategoryId]);
                })
                .catch((error) => {
                    alert(error.message);
                });
        });
    }, [cookies.accessToken, categoryIdList]);
    
    
    useEffect(() => {
        if (selectedCategoryId === 0 || selectedCategoryId === null) {
            setFileData(allFileData);
        } else {
            const filteredFiles = allFileData.filter(file => file.categoryId === selectedCategoryId);
            setFileData(filteredFiles);
        }
    }, [cookies.accessToken, selectedCategoryId, allFileData]);

    const getCategoryColor = (categoryId) => {
        const category = categoryList.find(cat => cat.id === categoryId);
        return category ? category.color : 'transparent';
    };

    const handleDownload = (fileId, fileName) => {
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
            });
    };
    
    return (
        <main className="file-main">
            <section className="file-main-inner">
                <table className="file-table">
                    <thead>
                        <tr>
                            <th>순서</th>
                            <th>카테고리</th>
                            <th>제목</th>
                            <th>게시일</th>
                            <th>다운로드</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fileData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <span className='category' style={{ backgroundColor: getCategoryColor(item.categoryId) }}>
                                        {item.name}
                                    </span>
                                </td>
                                <td>{item.fileName}</td>
                                <td>{fileFormattedDate(item.createdAt)}</td>
                                <td>
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
