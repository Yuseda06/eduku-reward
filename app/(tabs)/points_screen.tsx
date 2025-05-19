import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { supabase } from '@/utils/supabase';

export default function PointsScreen() {
  const selectedChild = useSelector((state: RootState) => state.child.selectedChild);
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPoints = async () => {
    if (!selectedChild?.id) return;
    const { data, error } = await supabase
      .from('points')
      .select('*')
      .eq('child_id', selectedChild.id)
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else setPoints(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPoints();
  }, [selectedChild]);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <FlatList
      data={points}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      ListEmptyComponent={<Text style={styles.empty}>Tiada data point lagi.</Text>}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.reason}>{item.reason}</Text>
          <Text style={styles.point}>{item.point} mata</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  reason: { fontSize: 16, fontWeight: '600' },
  point: { fontSize: 14, color: 'gray', marginTop: 4 },
  empty: { textAlign: 'center', marginTop: 20, fontSize: 16 },
});
