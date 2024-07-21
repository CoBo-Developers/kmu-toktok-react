import { useState } from 'react';
import useUserStore from '../store/useUserStore';
import { registerApi } from '../api/registerApi';
import { setCookie } from '../utils/cookieManage';
import { useNavigate } from 'react-router-dom';

function useRegister() {
  const { name, studentId, setName, setStudentId } = useUserStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
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
      registerApi(name, studentId)
        .then((response) => {
          console.log('Register success:', response);
          setCookie("accessToken", response.data.accessToken, 2 * 60);
          setCookie("refreshToken", response.data.refreshToken, 24 * 14 * 60);
          setCookie('isActive', response.data.registerStateEnum,  2 * 60);
          navigate('/chatbot');
        })
        .catch((error) => {
          console.error(error.message);
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
