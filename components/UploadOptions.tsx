import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';


type Props = {
  onAnalyzeByUrl: (url: string) => void;
  onPickImage: () => void;
  imageUri: string | null;
  disabled?: boolean;
};

export default function UploadOptions({
  onAnalyzeByUrl,
  onPickImage,
  imageUri,
  disabled,
}: Props) {
  const [url, setUrl] = useState('');

  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder="Görsel URL girin"
        value={url}
        onChangeText={setUrl}
        style={styles.input}
        editable={!disabled}
      />
      <Button
        title="URL ile Analiz Et"
        onPress={() => onAnalyzeByUrl(url)}
        disabled={disabled || !url}
      />
      <View style={{ marginVertical: 10 }} />

      <Button
        title={imageUri ? "Yeni Fotoğraf Seç" : "Galeriden Fotoğraf Seç"}
        onPress={onPickImage}
        disabled={disabled}
      />
      <View style={{ marginVertical: 10 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 6,
  },
});
