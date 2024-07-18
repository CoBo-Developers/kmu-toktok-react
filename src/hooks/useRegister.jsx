import useUserStore from '../store/useUserStore';

function useRegister() {
  const { name, studentId, setName, setStudentId } = useUserStore();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
  };

  return {
    name,
    studentId,
    handleNameChange,
    handleStudentIdChange,
  };
}

export default useRegister;
