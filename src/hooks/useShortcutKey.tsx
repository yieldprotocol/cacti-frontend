import { useCallback, useEffect } from 'react';

const useShortcutKey = (key: string, action: () => void, msg?: string) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.altKey === true) {
        event.key === `${key}` && action();
      }
    },
    [action, key]
  );

  useEffect(() => {
    // attach the event listener on load
    document.addEventListener('keydown', handleKeyPress);
    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
};

export default useShortcutKey;
