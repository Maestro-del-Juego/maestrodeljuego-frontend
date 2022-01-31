import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';

export default function LoadingComponent() {
  return (
    <Box sx={{ width: 250, margin: 'auto', padding: '20px' }}>
      <Skeleton variant="circular" animation="wave" width={40} height={40} />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </Box>
  );
}
