import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export default function AccordionItem({ title, children, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => setOpen(!open)} style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={{ fontSize: 18, color: '#888' }}>{open ? '−' : '+'}</Text>
      </TouchableOpacity>
      {open && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#f6f8fa',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#e9e9e9',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#333',
  },
  content: {
    padding: 12,
    backgroundColor: '#fff',
  },
});
