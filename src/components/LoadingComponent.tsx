import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';

interface loadingProps {
  loadingWidth: number;
  loadingPadding: string;
}

export default function LoadingComponent(props: loadingProps) {
  return (
    <Box
      sx={{ width: props.loadingWidth, margin: 'auto', padding: props.loadingPadding }}
    >
      <Skeleton variant="circular" animation="wave" width={40} height={40} />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" />
    </Box>
  );
}
