import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function RewardCard({ name }: { name: string }) {
  const [points, setPoints] = useState(0);

  return (
    <View style={{
      marginVertical: 10,
      marginHorizontal: 16,
      padding: 16,
      borderRadius: 12,
      backgroundColor: '#f9fafb',
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 3,
    }}>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>{name}</Text>
      <Text style={{ fontSize: 16, color: '#4b5563', marginBottom: 12 }}>Points: {points}</Text>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Pressable
          onPress={() => setPoints(points + 1)}
          style={{
            backgroundColor: '#3b82f6',
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 8,
          }}>
          <Text style={{ color: 'white', fontWeight: '500' }}>➕ Add Point</Text>
        </Pressable>

        <Pressable
          onPress={() => setPoints(0)}
          style={{
            backgroundColor: '#e5e7eb',
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 8,
          }}>
          <Text style={{ color: '#374151', fontWeight: '500' }}>♻️ Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}
