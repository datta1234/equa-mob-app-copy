import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export default function useDisabledBackButtonAndroid() {
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => sub.remove();
  }, []);
}
