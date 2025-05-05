import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import RewardCard from '@/components/RewardCard';

const kids = [
  { name: 'Irfan', key: 'irfan' },
  { name: 'Naufal', key: 'naufal' },
  { name: 'Zakwan', key: 'zakwan' },
];

export default function RewardScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
      }}
    >
      {kids.map((kid) => (
        <View key={kid.key} style={{ marginBottom: 20 }}>
          <RewardCard name={kid.name} />
        </View>
      ))}
    </ScrollView>
  );
}
