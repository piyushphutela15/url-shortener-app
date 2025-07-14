import React, { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { logEvent } from '../logger/loggerMiddleware';

export const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const [urls, setUrls] = useState(() => {
    const saved = localStorage.getItem('shortenedUrls');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('shortenedUrls', JSON.stringify(urls));
  }, [urls]);

  const addUrl = (urlData) => {
    const newUrl = {
      id: uuidv4(),
      ...urlData,
      clickCount: 0,
      clickDetails: []
    };
    logEvent('URL_ADDED', 'Added new shortened URL', newUrl);
    setUrls(prev => [...prev, newUrl]);
  };

  const addClick = (shortcode, detail) => {
    setUrls(prev =>
      prev.map(url =>
        url.shortcode === shortcode
          ? {
              ...url,
              clickCount: url.clickCount + 1,
              clickDetails: [...url.clickDetails, detail]
            }
          : url
      )
    );
  };

  const getUrlByShortcode = (shortcode) => {
    return urls.find(url => url.shortcode === shortcode);
  };

  return (
    <UrlContext.Provider value={{ urls, addUrl, addClick, getUrlByShortcode }}>
      {children}
    </UrlContext.Provider>
  );
};