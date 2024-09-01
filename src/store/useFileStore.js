import { create } from 'zustand'

const useCategoryStore = create((set) => ({
    categoryList: [],

    colors: ['#E3F1D4','#FFE5E5','#F7F5BA','#E2D7EE','#BADAF7','#FFBCC4','#CDBA9E','#BAF7F4','#FFDB96'],

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