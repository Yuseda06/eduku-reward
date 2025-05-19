import { useEffect } from 'react';
import { useRouter, usePathname } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Text, View } from 'react-native';

export default function IndexScreen() {
  const router = useRouter();
  const pathname = usePathname();
  const selectedChild = useSelector((state: RootState) => state.child.selectedChild);

  console.log('selectedChild:', selectedChild);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!selectedChild && pathname === '/(tabs)') {
        router.replace('/onboarding/select_child');
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [selectedChild, pathname]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {selectedChild ? (
        <Text style={{ fontSize: 20, fontWeight: '600' }}>
          Selamat datang, {selectedChild.name}!
        </Text>
      ) : (
        <Text>Memuatkan...</Text>
      )}
    </View>
  );
}
