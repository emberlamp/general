import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  className?: string;
  text?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  className = '',
  text = 'Back',
}) => {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => { navigate('/'); window.scrollTo(0, 0); }}
      className={`text-white/70 hover:text-white text-sm font-light tracking-wide uppercase transition-colors duration-300 ${className}`}
    >
      ← {text}
    </button>
  );
};

export default BackButton;
