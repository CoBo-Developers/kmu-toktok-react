import { create } from 'zustand';

const useUserStore = create((set) => ({
  name: '',
  studentId: '',
  setName: (name) => set({ name: name }),
  setStudentId: (studentId) => set({ studentId: studentId }),
}));

export default useUserStore;