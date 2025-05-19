import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { supabase } from '../../utils/supabase';
import { setSelectedChild } from '../../store/child/childSlice';

export default function SelectChildScreen() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchChildren = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) console.error(error);
    else setChildren(data);
    setLoading(false);
  };

  const handleSelect = (child: { id: string; name: string }) => {
    dispatch(setSelectedChild(child));
    router.replace('/(tabs)/points_screen');
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <FlatList
      data={children}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <Pressable style={styles.card} onPress={() => handleSelect(item)}>
          <Text style={styles.name}>{item.name}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
});
