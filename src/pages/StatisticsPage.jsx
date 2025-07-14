import React, { useContext } from 'react';
import { UrlContext } from '../context/UrlContext';
import { Box, Typography } from '@mui/material';

const StatisticsPage = () => {
  const { urls } = useContext(UrlContext);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Statistics</Typography>
      {urls.map((url) => (
        <Box key={url.id} sx={{ mt: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
          <Typography><strong>Short:</strong> {window.location.origin}/{url.shortcode}</Typography>
          <Typography><strong>Original:</strong> {url.longUrl}</Typography>
          <Typography><strong>Created At:</strong> {new Date(url.createdAt).toLocaleString()}</Typography>
          <Typography><strong>Expires At:</strong> {new Date(url.expiry).toLocaleString()}</Typography>
          <Typography><strong>Clicks:</strong> {url.clickCount}</Typography>
          {url.clickDetails.map((click, idx) => (
            <Box key={idx} sx={{ pl: 2, mt: 1 }}>
              <Typography variant="body2">Clicked at: {new Date(click.timestamp).toLocaleString()}</Typography>
              <Typography variant="body2">Source: {click.source}</Typography>
              <Typography variant="body2">Location: {click.location}</Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default StatisticsPage;