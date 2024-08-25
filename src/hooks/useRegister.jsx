import { useState } from 'react';
import useUserStore from '../store/useUserStore';
import { registerApi } from '../api/registerApi';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function useRegister() {
  const { studentId, setStudentId } = useUserStore();
  const [name, setName] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken', 'isActive']);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
  };

  const isButtonActive = name.trim() !== '' && studentId.trim() !== '';

  const handleSubmit = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (isChecked) {
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      registerApi(name, studentId, cookies.accessToken)
        .then((response) => {
          setCookie('accessToken', response.data.accessToken, { path: '/', maxAge: 2 * 60 * 60 });
          setCookie('refreshToken', response.data.refreshToken, { path: '/', maxAge: 24 * 7 * 60 });
          setCookie('isActive', response.data.registerStateEnum, { path: '/', maxAge: 2 * 60 * 60 });
          alert('회원가입 완료되었습니다');
          navigate('/chatbot');
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const handleCheckIcon = () => {
    if (currentStep === 2) {
      setIsChecked(!isChecked);
      if (!isChecked) {
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      setIsChecked(!isChecked);
      if (isChecked) {
        setCurrentStep(2);
      }
    }
  };

  return {
    name,
    studentId,
    handleNameChange,
    handleStudentIdChange,
    isButtonActive,
    handleSubmit,
    currentStep,
    isChecked,
    handleCheckIcon
  };
}

export default useRegister;
