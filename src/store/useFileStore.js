import { create } from 'zustand'

const useCategoryStore = create((set) => ({
    categoryList: [],

    colors: ['#FFD1FA','#E5FFD1','#D1F1FF','#FFFAD1','#EED1FF','#EEEEEE'],

    setCategoryList: (id, categoryName) =>
        set((state) => {
            const colorIndex = state.categoryList.length % state.colors.length;
            const color = state.colors[colorIndex];

            return {
                categoryList: [
                    ...state.categoryList,
                    { id, name: categoryName, color },
                ],
            };
        }),
}));

const useSelectedCategoryIdStore = create((set) => ({
    selectedCategoryId: 0,
    setSelectedCategoryId: (newSelectedCategoryId) => set({ selectedCategoryId: newSelectedCategoryId }),
}))

export { useSelectedCategoryIdStore, useCategoryStore };