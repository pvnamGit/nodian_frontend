import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useScript = (url: string, onload: any) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.onload = onload;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [url, onload]);
};

export default useScript;
