import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RewardCard({ name }: { name: string }) {
  const [points, setPoints] = useState(0);
  const storageKey = `point-${name.toLowerCase()}`;
  const pointThreshold = 5;


  useEffect(() => {
    const loadPoints = async () => {
      const saved = await AsyncStorage.getItem(storageKey);
      if (saved !== null) setPoints(parseInt(saved));
    };
    loadPoints();
  }, []);

  const savePoints = async (value: number) => {
    setPoints(value);
    await AsyncStorage.setItem(storageKey, value.toString());
  
    if (value === pointThreshold) {
      try {
        const webhookUrl = `http://192.168.68.111:8123/api/webhook/reward_${name.toLowerCase()}_usb_on`;
        const res = await fetch(webhookUrl, { method: 'POST' });
        if (res.ok) {
          alert(`${name} dah cukup point! 🎉 Reward triggered.`);
          // Optional: Reset balik ke 0 lepas reward
          setPoints(0);
          await AsyncStorage.setItem(storageKey, '0');
        } else {
          alert('Gagal trigger reward.');
        }
      } catch (err) {
        console.error(err);
        alert('Error call webhook.');
      }
    }
  };
  
  const triggerReset = async () => {
    try {
      await fetch(`http://192.168.68.111:8123/api/webhook/reward_${name.toLowerCase()}_usb_off`, {
        method: 'POST',
      });
      setPoints(0);
      await AsyncStorage.setItem(storageKey, '0');
      console.log('Reset sent!');
    } catch (err) {
      console.error('Reset failed:', err);
    }
  };
  

  return (
    <View
      style={{
        marginVertical: 10,
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#f9fafb',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>{name}</Text>
      <Text style={{ fontSize: 16, color: '#4b5563', marginBottom: 12 }}>Points: {points}</Text>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Pressable
          onPress={() => savePoints(points + 1)}
          style={{
            backgroundColor: '#3b82f6',
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 8,
            marginRight: 8,
          }}
        >
          <Text style={{ color: 'white', fontWeight: '500' }}>➕ Add</Text>
        </Pressable>

        <Pressable
          onPress={() => triggerReset()}
          style={{
            backgroundColor: '#e5e7eb',
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#374151', fontWeight: '500' }}>♻️ Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}
