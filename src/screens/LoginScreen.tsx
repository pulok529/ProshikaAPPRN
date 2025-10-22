import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation';
import { login } from '@/services/api';
import { Session } from '@/services/storage';

export default function LoginScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Login'>) {
  const [userid, setUserid] = useState('demo');
  const [password, setPassword] = useState('1234');
  const [loading, setLoading] = useState(false);

  const onSignIn = async () => {
    if (!userid || !password) { Alert.alert('Required', 'Enter userid & password'); return; }
    setLoading(true);
    try {
      const res = await login({ userid, password });
      if (res.success && res.userid) {
        await Session.setUserId(res.userid);
        navigation.replace('Customer');
      } else {
        Alert.alert('Login failed', 'Wrong credentials (mock password is 1234)');
      }
    } finally { setLoading(false); }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Proshika Collection</Text>
      <TextInput placeholder="User ID" value={userid} onChangeText={setUserid} style={styles.input} autoCapitalize="none" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title={loading ? 'Signing in...' : 'Sign In'} onPress={onSignIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 }
});
