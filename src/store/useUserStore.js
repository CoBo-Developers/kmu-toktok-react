import { create } from 'zustand';

const useUserStore = create((set) => ({
  studentId: '',
  setStudentId: (studentId) => set({ studentId: studentId }),
}));

export default useUserStore;