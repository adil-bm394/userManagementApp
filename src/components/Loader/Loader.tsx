
import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography, Container } from '@mui/material';

const Loader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isLoading ? (
        <Container maxWidth="xs" sx={{ marginTop: '30px' }}>
          <CircularProgress />
          <Typography variant="h6" gutterBottom align="center">Loading...</Typography>
        </Container>
      ) : null}
    </>
  );
};

export default Loader;
