import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import { UrlContext } from '../context/UrlContext';
import { isValidUrl, isValidShortcode } from '../utils/validation';
import { generateShortcode } from '../utils/generateShortcode';

const ShortenerPage = () => {
  const [inputs, setInputs] = useState([{ url: '', validity: '', shortcode: '' }]);
  const { urls, addUrl } = useContext(UrlContext);

  const handleChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };

  const handleAddInput = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: '', validity: '', shortcode: '' }]);
    }
  };

  const handleSubmit = () => {
    inputs.forEach(({ url, validity, shortcode }) => {
      if (!isValidUrl(url)) return alert('Invalid URL');
      if (shortcode && !isValidShortcode(shortcode)) return alert('Invalid Shortcode');

      const finalCode = shortcode || generateShortcode();
      const now = new Date();
      const expiry = new Date(now.getTime() + (parseInt(validity || 30) * 60000));

      if (urls.find(u => u.shortcode === finalCode)) {
        return alert(`Shortcode ${finalCode} already exists`);
      }

      addUrl({ longUrl: url, shortcode: finalCode, createdAt: now, expiry });
    });

    setInputs([{ url: '', validity: '', shortcode: '' }]);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {inputs.map((input, idx) => (
        <Grid container spacing={2} key={idx} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Original URL" value={input.url} onChange={(e) => handleChange(idx, 'url', e.target.value)} />
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth label="Validity (mins)" value={input.validity} onChange={(e) => handleChange(idx, 'validity', e.target.value)} />
          </Grid>
          <Grid item xs={3}>
            <TextField fullWidth label="Shortcode (opt)" value={input.shortcode} onChange={(e) => handleChange(idx, 'shortcode', e.target.value)} />
          </Grid>
        </Grid>
      ))}
      <Button variant="outlined" onClick={handleAddInput} disabled={inputs.length >= 5}>Add Another</Button>
      <Button variant="contained" sx={{ ml: 2 }} onClick={handleSubmit}>Shorten</Button>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Generated URLs</Typography>
        {urls.map((url) => (
          <Box key={url.id} sx={{ mt: 1 }}>
            <a href={`/${url.shortcode}`}>{window.location.origin}/{url.shortcode}</a> (expires at {new Date(url.expiry).toLocaleTimeString()})
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ShortenerPage;