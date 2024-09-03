/* eslint-disable react/prop-types */
import './LoadingModal.css';

const LoadingModal = ({ show }) => {
  if (!show) return null;

  return (
    <div className="loading-modal-background">
      <div className="loading-modal-content">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
