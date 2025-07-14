import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UrlContext } from '../context/UrlContext';

const RedirectPage = () => {
  const { shortcode } = useParams();
  const { getUrlByShortcode, addClick } = useContext(UrlContext);
  const navigate = useNavigate();

  useEffect(() => {
    const url = getUrlByShortcode(shortcode);
    if (!url) return navigate('/');
    const now = new Date();
    if (new Date(url.expiry) < now) {
      alert('This link has expired.');
      return navigate('/');
    }

    const clickDetail = {
      timestamp: now.toISOString(),
      source: document.referrer || 'Direct',
      location: 'India' // Replace with actual geo IP in real app
    };

    addClick(shortcode, clickDetail);
    window.location.href = url.longUrl;
  }, [shortcode]);

  return <div>Redirecting...</div>;
};

export default RedirectPage;