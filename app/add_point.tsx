import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../utils/supabase';
import { useRouter } from 'expo-router';

export default function AddPointScreen() {
  const [point, setPoint] = useState('');
  const [reason, setReason] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!point || !reason) return Alert.alert('Isi semua maklumat');

    const { error } = await supabase.from('points').insert([
      {
        child_id: 'uuid-anak-irfan', // Ganti ikut anak
        point: Number(point),
        reason: reason,
      },
    ]);

    if (error) Alert.alert('Ralat', error.message);
    else {
      Alert.alert('Berjaya', 'Point telah ditambah');
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Markah</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={point}
        onChangeText={setPoint}
      />
      <Text style={styles.label}>Sebab</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        value={reason}
        onChangeText={setReason}
      />
      <Button title="Tambah Point" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
});
