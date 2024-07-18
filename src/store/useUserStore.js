import { create } from 'zustand';

const useUserStore = create((set) => ({
  name: '',
  studentId: '',
  setName: (name) => set({ name }),
  setStudentId: (studentId) => set({ studentId }),
}));

export default useUserStore;