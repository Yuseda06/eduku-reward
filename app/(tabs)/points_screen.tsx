import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { supabase } from '../../utils/supabase';

const PointsScreen = ({ childId }: { childId: string }) => {
  const [points, setPoints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPoints = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('points')
      .select('*')
      .eq('child_id', childId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setPoints(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.reason}>{item.reason}</Text>
      <Text style={styles.point}>+{item.point} pts</Text>
      <Text style={styles.date}>{new Date(item.created_at).toLocaleString()}</Text>
    </View>
  );

  if (loading) return <ActivityIndicator size="large" color="#007AFF" />;

  return (
    <FlatList
      data={points}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: '#f0f4f7',
    elevation: 2,
  },
  reason: {
    fontSize: 16,
    fontWeight: '600',
  },
  point: {
    fontSize: 14,
    color: 'green',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#555',
    marginTop: 4,
  },
});

export default PointsScreen;
