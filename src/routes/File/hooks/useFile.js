import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getFileList, getCategoryList, fileDownload } from '../../../api/fileApi';
import { useCategoryStore, useSelectedCategoryIdStore } from '../../../store/useFileStore';

const useFile = () => {
  const [cookies] = useCookies(["accessToken"]);
  const [fileData, setFileData] = useState([]);
  const [allFileData, setAllFileData] = useState([]);
  const [categoryIdList, setCategoryIdList] = useState([]);
  const selectedCategoryId = useSelectedCategoryIdStore(
    (state) => state.selectedCategoryId
  );
  const { categoryList, setCategoryList } = useCategoryStore((state) => ({
    categoryList: state.categoryList,
    setCategoryList: state.setCategoryList,
  }));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCategoryList(cookies.accessToken)
      .then((response) => {
        setCategoryIdList(
          response.data.categories.map((category) => category.id)
        );
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
          const filesWithCategoryId = response.data.files.map((file) => ({
            ...file,
            categoryId,
            categoryName: categoryList.find((cat) => cat.id === categoryId).name,
          }));

          setAllFileData((prevData) => {
            const existingIds = new Set(prevData.map((file) => file.id));
            const newFiles = filesWithCategoryId.filter((file) => !existingIds.has(file.id));
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
        .filter((file) => file.categoryId === selectedCategoryId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setFileData(filteredFiles);
    }
  }, [cookies.accessToken, selectedCategoryId, allFileData]);

  const getCategoryColor = (categoryId) => {
    const category = categoryList.find((cat) => cat.id === categoryId);
    return category ? category.color : "transparent";
  };

  const handleDownload = (fileId, fileName) => {
    setIsLoading(true);
    fileDownload(cookies.accessToken, fileId)
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
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

  const isNewFile = (createdAt) => {
    const now = new Date();
    const fileDate = new Date(createdAt);
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    return now - fileDate <= oneWeek;
  };

  return {
    fileData,
    isLoading,
    handleDownload,
    getCategoryColor,
    isNewFile,
  };
};

export default useFile;
