import { useState, useEffect } from "react";
import "./FileMenu.css";
import categoryCheckIcon from "../../../assets/icons/category-check-icon.svg";
import { getCategoryList } from "../../../api/fileApi";
import { useCookies } from "react-cookie";
import { useSelectedCategoryIdStore } from "../../../store/useFileStore";

const FileMenu = () => {
  const [cookies] = useCookies(["accessToken"]);
  const [categories, setCategories] = useState([]);

  const { selectedCategoryIdStore, setSelectedCategoryIdStore } =
    useSelectedCategoryIdStore((state) => ({
      selectedCategoryIdStore: state.selectedCategoryId,
      setSelectedCategoryIdStore: state.setSelectedCategoryId,
    }));

  useEffect(() => {
    getCategoryList(cookies.accessToken)
      .then((response) => {
        const newCategory = { id: 0, name: "게시된 모든 파일 보기" };
        const updatedCategories = [newCategory, ...response.data.categories];
        setCategories(updatedCategories);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [cookies.accessToken]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryIdStore(categoryId);
  };

  return (
    <section className="category-wrapper">
      <ul className="category-list">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`category-item ${ selectedCategoryIdStore === category.id ? "active" : "" }`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name}
            {selectedCategoryIdStore === category.id && (
              <img
                src={categoryCheckIcon}
                className="category-check-icon"
                alt=""
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FileMenu;
