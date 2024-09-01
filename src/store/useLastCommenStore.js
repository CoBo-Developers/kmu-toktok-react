import { create } from 'zustand';

const useLastCommentStore = create((set) => ({
  lastCommentIsQuestion: true,
  setLastCommentIsQuestion: (lastCommentIsQuestion) => set({ lastCommentIsQuestion: lastCommentIsQuestion }),
}));

export default useLastCommentStore;