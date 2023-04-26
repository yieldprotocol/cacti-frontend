import { useEffect} from 'react';

const useShortcutKey = (key: string, action: () => void, msg?: string) => {

  const handleKeyPress = (event: any) => {
    if (event.altKey === true) {
      event.key === `${key}` &&  action()
    }
  };

  useEffect(() => {
    // attach the event listener on load
    document.addEventListener('keydown', handleKeyPress);
    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

};

export default useShortcutKey;
