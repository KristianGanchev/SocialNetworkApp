import { useEffect, useRef, useCallback } from 'react';

type Callback = () => void;

const useClickOutside = (callback: Callback): React.RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: Event) => {
      const target = event.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return ref;
};

export default useClickOutside