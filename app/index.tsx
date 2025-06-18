import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';

import UploadOptions from '../components/UploadOptions';
import ResultBar from '../components/ResultBar';
import { useImageAnalysis } from '../hooks/useImageAnalysis';
import { translate } from '../utils/translations';
import { groupResults } from '../utils/groupResults';
import { generateGptSummary } from '../utils/generateGptSummary';
import ImageWithBoxes from '@/components/ImageWithBoxes';
import LottieView from 'lottie-react-native';
import AccordionItem from '@/components/AccordionItem';


export default function HomeScreen() {
  const [summary, setSummary] = useState('');
  const [results, setResults] = useState([]);
  const [isLoadingGpt, setIsLoadingGpt] = useState(false);
  const [lang, setLang] = useState<'tr' | 'en'>('tr');
  const {
    imageUri,
    faces,
    isLoading,
    analyzeByUrl,
    pickImage,
    reset,
    setImageUri,
  } = useImageAnalysis();

      const handleResults = async (res, uri) => {
        setResults(res);
        if (uri) setImageUri(uri);
        if (res.length > 0) {
          setIsLoadingGpt(true);
          try {
            const gptSummary = await generateGptSummary(res, lang);
            setSummary(gptSummary);
          } catch {
            setSummary(lang === 'tr' ? 'GPT özeti alınamadı.' : 'GPT summary failed.');
          } finally {
            setIsLoadingGpt(false);
          }
        }
      };


  const handleAnalyzeByUrl = async (url: string) => {
    try {
      await analyzeByUrl(url, handleResults, setSummary);
    } catch {
      Alert.alert('Hata', 'URL ile analiz başarısız.');
    }
  };

  const handlePickImage = async () => {
    try {
      await pickImage(handleResults, setSummary);
    } catch {
      Alert.alert('Hata', 'Görsel ile analiz başarısız.');
    }
  };

  const handleReset = () => {
    reset(setResults, setSummary);
  };

  console.log(faces)
  const toggleLang = () => setLang((prev) => (prev === 'tr' ? 'en' : 'tr'));

  const grouped = groupResults(results.sort((a, b) => b.prob - a.prob));

  return (
<ScrollView
  contentContainerStyle={[
    styles.container,
    !imageUri && !isLoading && styles.centered,
  ]}
>
  <View style={styles.card}>
    <View style={styles.headerRow}>
      <Text style={styles.appTitle}>Sightengine Görsel Analiz</Text>
      <TouchableOpacity style={styles.langChip} onPress={toggleLang}>
        <Text style={styles.langChipText}>
          {lang === 'tr' ? 'TR 🇹🇷' : 'EN 🇬🇧'}
        </Text>
      </TouchableOpacity>
    </View>

    <View style={{ marginVertical: 8 }}>
      <UploadOptions
        onAnalyzeByUrl={handleAnalyzeByUrl}
        onPickImage={handlePickImage}
        imageUri={imageUri}
        disabled={isLoading}
      />
    </View>

    {isLoading && (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={{ marginTop: 10 }}>
          {lang === 'tr' ? 'Analiz ediliyor...' : 'Analyzing...'}
        </Text>
      </View>
    )}

    {imageUri && (
      <>
        <ImageWithBoxes imageUri={imageUri} boxes={faces} style={styles.analyzedImage} />
        <TouchableOpacity style={styles.removeBtn} onPress={handleReset}>
          <Text style={styles.removeBtnText}>Görseli Kaldır</Text>
        </TouchableOpacity>
        {summary !== '' && (
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>
              {lang === 'tr' ? 'GPT Moderasyon Özeti' : 'GPT Moderation Summary'}
            </Text>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        )}
      </>
    )}

    {!isLoading && Object.entries(grouped).length > 0 && (
      <>
        {isLoadingGpt && (
          <View style={{ alignItems: 'center', marginVertical: 18, height: 60 }}>
            <Text style={{ marginTop: 8, color: '#555' }}>
              {lang === 'tr' ? 'GPT özeti hazırlanıyor...' : 'GPT summary is being prepared...'}
            </Text>
            <LottieView
              source={require('../assets/loading.json')}
              autoPlay
              loop
              style={{ width: 200, height: 100 }}
            />
          </View>
        )}
        {Object.entries(grouped).map(([group, items], idx) => {
          if (group.toLowerCase() === 'request') return null;
          const filteredItems = items.filter((item) => item.prob >= 0.1);
          if (filteredItems.length === 0) return null;
          return (
            <AccordionItem
              key={idx}
              title={translate(group).toUpperCase()}
              defaultOpen={idx === 0}
            >
              {filteredItems.map((item, index) => (
                <ResultBar key={index} label={translate(item.label)} value={item.prob} />
              ))}
            </AccordionItem>
          );
        })}
      </>
    )}
  </View>
</ScrollView>

  );
}


const styles = StyleSheet.create({
    loadingContainer: { alignItems: 'center', marginTop: 20 },
container: {
  flexGrow: 1,
  backgroundColor: '#f3f5fa',
  padding: 0,
  minHeight: '100%',
},
centered: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
card: {
  backgroundColor: '#fff',
  borderRadius: 16,
  padding: 20,
  margin: 20,
  shadowColor: '#222',
  shadowOpacity: 0.09,
  shadowRadius: 12,
  elevation: 3,
  minWidth: 320,
  maxWidth: 400,
  alignSelf: 'center',
},
headerRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 8,
},
appTitle: {
  fontSize: 20,
  fontWeight: '700',
  letterSpacing: 0.2,
},
langChip: {
  backgroundColor: '#f0f1f5',
  borderRadius: 14,
  paddingVertical: 4,
  paddingHorizontal: 12,
  alignSelf: 'center',
},
langChipText: {
  fontSize: 13,
  fontWeight: '600',
  color: '#444',
},
analyzedImage: {
  width: 320,
  height: 220,
  borderRadius: 14,
  marginTop: 12,
  marginBottom: 8,
  alignSelf: 'center', // ortala
},
removeBtn: {
  alignSelf: 'flex-end',
  marginVertical: 6,
  paddingVertical: 4,
  paddingHorizontal: 12,
  backgroundColor: '#ffe7e7',
  borderRadius: 8,
},
removeBtnText: {
  color: '#d32f2f',
  fontWeight: 'bold',
},
summaryBox: {
  backgroundColor: '#f7f8fa',
  borderRadius: 10,
  padding: 10,
  marginVertical: 12,
},
summaryTitle: {
  fontWeight: 'bold',
  fontSize: 15,
  marginBottom: 4,
},
summaryText: {
  color: '#333',
  fontSize: 14,
},

});
