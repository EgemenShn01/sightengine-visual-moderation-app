import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function ImageWithBoxes({ imageUri, boxes, style }) {
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  if (!imageUri) return null;

  return (
    <View
      style={[styles.wrapper, style]}
      onLayout={e => setLayout(e.nativeEvent.layout)}
    >
      <Image source={{ uri: imageUri }} style={styles.img} resizeMode="contain" />
      {boxes?.map((box, idx) => (
        <View
          key={idx}
          style={{
            position: 'absolute',
            left: box.x1 * layout.width,
            top: box.y1 * layout.height,
            width: (box.x2 - box.x1) * layout.width,
            height: (box.y2 - box.y1) * layout.height,
            borderWidth: 2,
            borderColor: 'red',
            borderRadius: 4,
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 220,
    position: 'relative',
    marginBottom: 16,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
