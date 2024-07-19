import useUserStore from '../store/useUserStore';

function useRegister() {
  const { name, studentId, setName, setStudentId } = useUserStore();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
  };

  const isButtonActive = name.trim() !== '' && studentId.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, studentId);
  };

  return {
    name,
    studentId,
    handleNameChange,
    handleStudentIdChange,
    isButtonActive,
    handleSubmit,
  };
}

export default useRegister;
