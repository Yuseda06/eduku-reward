// app/_layout.tsx
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import { Buffer } from 'buffer';

if (!global.Buffer) global.Buffer = Buffer;
if (!global.process) global.process = require('process');

import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function Layout() {
  return <Stack />;
}
