import { create } from 'zustand';

const useLastCommentStore = create((set) => ({
  lastCommentIsQuestion: false,
  setLastCommentIsQuestion: (lastCommentIsQuestion) => set({ lastCommentIsQuestion: lastCommentIsQuestion }),
}));

export default useLastCommentStore;