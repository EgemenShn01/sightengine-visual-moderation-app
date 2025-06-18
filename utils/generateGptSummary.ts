import OpenAI from 'openai';
import { OPENROUTER_API_KEY } from '@env';

const openai = new OpenAI({
  apiKey: OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  dangerouslyAllowBrowser: true,
});

export const generateGptSummary = async (
  results: { label: string; prob: number }[],
  lang: 'tr' | 'en' = 'tr'
) => {
  const filtered = results
    .filter(r => r.prob > 0.1)
    .sort((a, b) => b.prob - a.prob)
    .map(r => `${r.label} (${(r.prob * 100).toFixed(1)}%)`)
    .join(', ');

  const prompt =
    lang === 'tr'
      ? `Aşağıdaki görsel analiz sonuçlarına göre kısa ve sade bir moderasyon özeti yaz:\n${filtered}\nYanıt Türkçe, kısa ve net olsun. Uygunsuz içerik varsa belirt.`
      : `Write a short, clear moderation summary based on the following image analysis results:\n${filtered}\nThe response should be in English. Highlight any inappropriate content.`;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const reply = chatCompletion.choices[0].message.content || '';
    console.log('🧠 GPT Yanıtı:', reply);
    return reply;
  } catch (err) {
    console.error('GPT özet hatası:', err);
    return lang === 'tr' ? 'GPT özeti alınamadı.' : 'Failed to get GPT summary.';
  }
};
