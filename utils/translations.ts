export const translate = (key: string): string => {
  const dict: Record<string, string> = {
    'nudity.none': 'Çıplaklık Yok',
    'nudity.sexual_activity': 'Cinsel Aktivite',
    'nudity.sexual_display': 'Cinsel Gösterim',
    'nudity.erotica': 'Erotik',
    'nudity.very_suggestive': 'Çok Müstehcen',
    'nudity.suggestive': 'Müstehcen',
    'nudity.mildly_suggestive': 'Hafif Müstehcen',
    'nudity.context.sea_lake_pool': 'Deniz / Havuz',
    'nudity.context.outdoor_other': 'Açık Alan',
    'nudity.context.indoor_other': 'Kapalı Alan',

    'nudity.suggestive_classes.bikini': 'Bikini',
    'nudity.suggestive_classes.lingerie': 'İç Çamaşırı',
    'nudity.suggestive_classes.male_chest': 'Erkek Göğsü',
    'nudity.suggestive_classes.male_underwear': 'Erkek İç Çamaşırı',
    'nudity.suggestive_classes.miniskirt': 'Mini Etek',
    'nudity.suggestive_classes.minishort': 'Mini Şort',
    'nudity.suggestive_classes.nudity_art': 'Sanatsal Çıplaklık',
    'nudity.suggestive_classes.schematic': 'Şematik Görsel',
    'nudity.suggestive_classes.sextoy': 'Cinsel Oyuncak',
    'nudity.suggestive_classes.suggestive_focus': 'Müstehcen Odak',
    'nudity.suggestive_classes.suggestive_pose': 'Müstehcen Poz',
    'nudity.suggestive_classes.swimwear_male': 'Erkek Mayo',
    'nudity.suggestive_classes.swimwear_one_piece': 'Tek Parça Mayo',
    'nudity.suggestive_classes.visibly_undressed': 'Belirgin Açıklık',
    'nudity.suggestive_classes.other': 'Diğer',

    'nudity.suggestive_classes.cleavage': 'Dekolte',
    'nudity.suggestive_classes.cleavage_categories.none': 'Dekolte Yok',
    'nudity.suggestive_classes.cleavage_categories.revealing': 'Dekolte (Orta)',
    'nudity.suggestive_classes.cleavage_categories.very_revealing': 'Dekolte (Fazla)',

    'nudity.suggestive_classes.male_chest_categories.none': 'Erkek Göğüs Yok',
    'nudity.suggestive_classes.male_chest_categories.slightly_revealing': 'Erkek Göğüs (Hafif)',
    'nudity.suggestive_classes.male_chest_categories.revealing': 'Erkek Göğüs (Orta)',
    'nudity.suggestive_classes.male_chest_categories.very_revealing': 'Erkek Göğüs (Fazla)',

    'weapon.classes.firearm': 'Ateşli Silah',
    'weapon.classes.knife': 'Bıçak',
    'weapon.classes.firearm_gesture': 'Silah İmgesi',
    'weapon.classes.firearm_toy': 'Oyuncak Silah',

    'weapon.firearm_type.animated': 'Animasyon Silah',

    'weapon.firearm_action.aiming_threat': 'Tehdit Amaçlı Nişan',
    'weapon.firearm_action.aiming_camera': 'Kameraya Nişan',
    'weapon.firearm_action.aiming_safe': 'Güvenli Nişan',
    'weapon.firearm_action.in_hand_not_aiming': 'Elde, Nişan Almıyor',
    'weapon.firearm_action.worn_not_in_hand': 'Taşınıyor (Elde Değil)',
    'weapon.firearm_action.not_worn': 'Taşınmıyor',

    'recreational_drug.prob': 'Uyuşturucu Olasılığı',
    'recreational_drug.classes.cannabis': 'Esrar',
    'recreational_drug.classes.cannabis_logo_only': 'Esrar Logosu',
    'recreational_drug.classes.cannabis_plant': 'Esrar Bitkisi',
    'recreational_drug.classes.cannabis_drug': 'Esrar Ürünü',
    'recreational_drug.classes.recreational_drugs_not_cannabis': 'Diğer Uyuşturucular',

    'alcohol.prob': 'Alkol Olasılığı',

    'offensive.nazi': 'Nazi Sembolü',
    'offensive.asian_swastika': 'Asya Swastika',
    'offensive.confederate': 'Konfederasyon Bayrağı',
    'offensive.supremacist': 'Irkçı Sembol',
    'offensive.terrorist': 'Terörist Sembol',
    'offensive.middle_finger': 'Orta Parmak',

    'faces.length': 'Yüz Sayısı',
    'faces.0.x1': 'Yüz Sol Üst X',
    'faces.0.y1': 'Yüz Sol Üst Y',
    'faces.0.x2': 'Yüz Sağ Alt X',
    'faces.0.y2': 'Yüz Sağ Alt Y',

    'faces.0.features.left_eye.x': 'Sol Göz X',
    'faces.0.features.left_eye.y': 'Sol Göz Y',
    'faces.0.features.right_eye.x': 'Sağ Göz X',
    'faces.0.features.right_eye.y': 'Sağ Göz Y',
    'faces.0.features.nose_tip.x': 'Burun Ucu X',
    'faces.0.features.nose_tip.y': 'Burun Ucu Y',
    'faces.0.features.left_mouth_corner.x': 'Ağız Sol Köşe X',
    'faces.0.features.left_mouth_corner.y': 'Ağız Sol Köşe Y',
    'faces.0.features.right_mouth_corner.x': 'Ağız Sağ Köşe X',
    'faces.0.features.right_mouth_corner.y': 'Ağız Sağ Köşe Y',
  };

  if (dict[key]) return dict[key];
  const fallback = key.split('.').pop()?.replace(/_/g, ' ');
  return fallback ? fallback.charAt(0).toUpperCase() + fallback.slice(1) : key;
};
