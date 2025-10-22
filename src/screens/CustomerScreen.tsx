import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation';
import { search, submit } from '@/services/api';
import { Session } from '@/services/storage';
import ProductGrid, { GridRow } from '@/components/ProductGrid';
import { Fund } from '@/types/dto';

export default function CustomerScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Customer'>) {
  const [adcno, setAdcno] = useState('A-1001');
  const [groupNo, setGroupNo] = useState('G-12');
  const [memberId, setMemberId] = useState('M-7788');
  const [funds, setFunds] = useState<Fund[]>([]);
  const [rows, setRows] = useState<GridRow[]>([]);
  const [loading, setLoading] = useState(false);

  const onSearch = async () => {
    if (!adcno || !groupNo || !memberId) { Alert.alert('Missing', 'Fill ADCNO, GroupNO, MemberID'); return; }
    setLoading(true);
    try {
      const res = await search({ adcno, groupNo, memberId });
      setFunds(res.funds);
      const flattened: GridRow[] = res.funds.flatMap(f => f.products.map(p => ({ ...p, fundid: f.fundid, receivedAmount: '' })));
      setRows(flattened);
    } finally { setLoading(false); }
  };

  const onSubmit = async () => {
    const userid = (await Session.getUserId()) || '';
    const entries = rows.map(r => ({ ...r, receivedAmount: Number(r.receivedAmount || '0') }));
    const payload = {
      userid,
      adcno, groupNo, memberId,
      timestamp: new Date().toISOString(),
      entries: entries.map(e => ({
        fundid: e.fundid,
        productId: e.productId,
        productName: e.productName,
        installmentAmount: e.installmentAmount,
        receivedAmount: e.receivedAmount
      }))
    };
    const ok = await submit(payload as any);
    Alert.alert(ok.success ? 'Submitted' : 'Failed', ok.success ? 'Saved successfully (mock).' : 'Please retry');
  };

  const scanQr = () => navigation.navigate('QRScanner');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Customer Search</Text>
      <View style={styles.inline}>
        <TextInput placeholder="ADCNO" value={adcno} onChangeText={setAdcno} style={styles.input} />
        <TextInput placeholder="GroupNO" value={groupNo} onChangeText={setGroupNo} style={styles.input} />
        <TextInput placeholder="MemberID" value={memberId} onChangeText={setMemberId} style={styles.input} />
      </View>
      <View style={styles.inline}>
        <Button title={loading ? 'Searching...' : 'Search'} onPress={onSearch} />
        <Button title="Scan QR" onPress={scanQr} />
      </View>

      {funds.length > 0 && (
        <View style={{ marginTop: 12 }}>
          <ProductGrid funds={funds} rows={rows} setRows={setRows} />
          <View style={{ marginTop: 12 }}>
            <Button title="Submit" onPress={onSubmit} />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: '700' },
  inline: { flexDirection: 'row', gap: 8, alignItems: 'center', marginTop: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 }
});
