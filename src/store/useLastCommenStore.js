import { create } from 'zustand';

const useLastCommentStore = create((set) => ({
  lastCommentIsQuestion: '',
  setLastCommentIsQuestion: (lastCommentIsQuestion) => set({ lastCommentIsQuestion: lastCommentIsQuestion }),
}));

export default useLastCommentStore;