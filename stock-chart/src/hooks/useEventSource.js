import { useEffect } from 'react';

const useEventSource = (onData, onError) => {
  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:5050/api/v1/cryptoData`
    );

    eventSource.addEventListener('message', (event) => {
      onData(event.data);
    });

    eventSource.addEventListener('error', onError);
    
    return () => {
      eventSource.close();
    };
  }, [onData, onError]);
}

export default useEventSource;
