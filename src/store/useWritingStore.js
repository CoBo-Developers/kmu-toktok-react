import { create } from 'zustand';

const useWritingStore = create((set) => ({
  writingList: [],
  myScore: 0,
  totalScore: 0,
  setWritingList: (list) => set({ writingList: list }),
  updateScores: (myScore, totalScore) => set({ myScore, totalScore }),
}));


export default useWritingStore;
