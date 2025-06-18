import { useState } from 'react';
import axios from 'axios';
import { UPLOAD_API_USER, UPLOAD_API_SECRET } from '@env';
import * as ImagePicker from 'expo-image-picker';
import { extractProbs } from '../utils/extractProbs';

export function useImageAnalysis() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [faces, setFaces] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeByUrl = async (url: string, setResults, setSummary) => {
    setSummary('');
    setIsLoading(true);
    try {
      const res = await axios.get('https://api.sightengine.com/1.0/check.json', {
        params: {
          url,
          models: 'nudity-2.1,weapon,alcohol,recreational_drug,faces,offensive-2.0',
          api_user: UPLOAD_API_USER,
          api_secret: UPLOAD_API_SECRET,
        },
      });
      setResults(extractProbs(res.data), url);
      setFaces(res.data.faces || []);
      setImageUri(url);
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async (setResults, setSummary) => {
    setSummary('');
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: false,
      quality: 1,
    });

    if (!res.canceled && res.assets?.length > 0) {
      const file = res.assets[0];
      setImageUri(file.uri);

      const formData = new FormData();
      formData.append('media', {
        uri: file.uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      } as any);
      formData.append('models', 'nudity-2.1,weapon,alcohol,recreational_drug,faces,offensive-2.0');
      formData.append('api_user', UPLOAD_API_USER);
      formData.append('api_secret', UPLOAD_API_SECRET);

      setIsLoading(true);
      try {
        const response = await axios.post(
          'https://api.sightengine.com/1.0/check.json',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setResults(extractProbs(response.data), file.uri);
        setFaces(response.data.faces || []);
      } catch (err) {
        throw err;
      } finally {
        setIsLoading(false);
      }
    }
  };

  const reset = (setResults, setSummary) => {
    setImageUri(null);
    setFaces([]);
    setResults([]);
    setSummary('');
  };

  return {
    imageUri,
    faces,
    isLoading,
    analyzeByUrl,
    pickImage,
    reset,
    setImageUri,
  };
}
