import { useState, useEffect } from 'react';

const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileWidth = window.innerWidth <= 768; // You can adjust the width threshold
      const isMobileDevice = /android|iphone|ipad|ipod/i.test(userAgent);
      setIsMobile(isMobileWidth || isMobileDevice);
    };

    checkIfMobile();
    
    window.addEventListener('resize', checkIfMobile);
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return isMobile;
};

export default useMobileDetect;