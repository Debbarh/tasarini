import BeInspiredMain from '@/components/forms/be-inspired/BeInspiredMain';
import { useNavigate } from 'react-router-dom';

const BeInspired = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/');
  };

  return <BeInspiredMain onBack={handleBack} />;
};

export default BeInspired;