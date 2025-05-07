import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';

export default function PointsScreen() {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPoints = async () => {
    const { data, error } = await supabase
    .from('points')
    .select('*');
  

    if (error) console.error(error);
    else setPoints(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="blue" />;

  return (
    <FlatList
      data={points}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 16, borderBottomWidth: 1, borderColor: '#ccc' }}>
          <Text>{item.reason}</Text>
          <Text>{item.point} pts</Text>
          <Text>{new Date(item.created_at).toLocaleString()}</Text>
        </View>
      )}
    />
  );
}
