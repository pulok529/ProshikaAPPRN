import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import { Fund, ProductItem } from '@/types/dto';

export type GridRow = ProductItem & { fundid: string; receivedAmount: string };

export default function ProductGrid({
  funds,
  rows,
  setRows
}: {
  funds: Fund[];
  rows: GridRow[];
  setRows: (rows: GridRow[]) => void;
}) {
  const data = rows;

  const renderItem = ({ item, index }: { item: GridRow; index: number }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { flex: 3 }]}>{item.productName}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.installmentAmount}</Text>
      <TextInput
        placeholder="0"
        keyboardType="numeric"
        value={item.receivedAmount}
        onChangeText={(t) => {
          const next = [...rows];
          next[index] = { ...item, receivedAmount: t.replace(/[^0-9.]/g, '') };
          setRows(next);
        }}
        style={[styles.cell, styles.input, { flex: 2 }]}
      />
    </View>
  );

  return (
    <View>
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cell, { flex: 3, fontWeight: '700' }]}>Product</Text>
        <Text style={[styles.cell, { flex: 2, fontWeight: '700' }]}>Installment</Text>
        <Text style={[styles.cell, { flex: 2, fontWeight: '700' }]}>Received</Text>
      </View>
      <FlatList data={data} renderItem={renderItem} keyExtractor={(it, i) => it.fundid + it.productId + i} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#eee' },
  header: { backgroundColor: '#f7f7f7' },
  cell: { paddingHorizontal: 8 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 6, paddingVertical: 4 }
});
