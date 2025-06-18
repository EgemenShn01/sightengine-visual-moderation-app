import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  label: string;
  value: number;
};

export default function ResultBar({ label, value }: Props) {
  const percent = (value * 100).toFixed(1);
  const getBarColor = (value: number) => {
        if (value >= 0.8) return '#e53935';
        if (value >= 0.5) return '#fb8c00';
        if (value >= 0.2) return '#fdd835';
        return '#43a047'; 
        };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.bar}>
        <View style={[styles.fill, { width: `${percent}%`, backgroundColor: getBarColor(value) }]} />
        </View>
      <Text style={styles.percent}>{percent}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { fontSize: 14, fontWeight: '600' },
  bar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 4,
  },
  fill: {
    height: '100%',
    backgroundColor: '#4285F4',
  },
  percent: {
    textAlign: 'right',
    fontSize: 12,
    marginTop: 2,
  },
});
