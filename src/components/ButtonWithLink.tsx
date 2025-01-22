import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

interface ButtonWithLinkProps {
  to: string; // Path to navigate to
  label: string; // Button text
  variant?: 'text' | 'outlined' | 'contained'; // Optional Material-UI Button variant
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'; // Optional button color
  fullWidth?: boolean;
}

const ButtonWithLink = ({ to, label, variant = 'contained', color = 'primary', fullWidth = false }: ButtonWithLinkProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <Button
      variant={variant}
      color={color}
      onClick={handleClick}
      fullWidth={fullWidth}
    >
      {label}
    </Button>
  );
};

export default ButtonWithLink;
