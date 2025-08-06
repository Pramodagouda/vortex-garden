import { LanguageCode } from './languages';

export interface CropTranslation {
  name: string;
  description?: string;
  marketTrends: string;
  profitPotential: string;
}

export interface CropTranslations {
  [cropId: string]: {
    [langCode in LanguageCode]: CropTranslation;
  };
}

export const CROP_TRANSLATIONS: CropTranslations = {
  '1': {
    en: {
      name: 'Rice (धान)',
      description: 'India\'s staple food crop with strong government support and consistent market demand.',
      marketTrends: 'Stable demand with government support price. Export opportunities available.',
      profitPotential: 'High profit margins due to consistent demand and MSP support.'
    },
    hi: {
      name: 'चावल (धान)',
      description: 'मजबूत सरकारी समर्थन और निरंतर बाजार मांग के साथ भारत की मुख्य खाद्य फसल।',
      marketTrends: 'सरकारी समर्थन मूल्य के साथ स्थिर मांग। निर्यात के अवसर उपलब्ध हैं।',
      profitPotential: 'निरंतर मांग और MSP समर्थन के कारण उच्च लाभ मार्जिन।'
    },
    ta: {
      name: 'அரிசி (धान)',
      description: 'வலுவான அரசாங்க ஆதரவு மற்றும் நிலையான சந்தை தேவையுடன் இந்தியாவின் முக்கிய உணவு பயிர்.',
      marketTrends: 'அரசாங்க ஆதரவு விலையுடன் நிலையான தேவை. ஏற்றுமதி வாய்ப்புகள் கிடைக்கின்றன.',
      profitPotential: 'நிலையான தேவை மற்றும் MSP ஆதரவு காரணமாக அதிக லாப வரம்புகள்.'
    },
    te: {
      name: 'బియ్యం (धान)',
      description: 'బలమైన ప్రభుత్వ మద్దతు మరియు స్థిరమైన మా���్కెట్ డిమాండ్‌తో భారతదేశపు ప్రధాన ఆహార పంట.',
      marketTrends: 'ప్రభుత్వ మద్దతు ధరతో స్థిరమైన డిమాండ్. ఎగుమతి అవకాశాలు అందుబాటులో ఉన్నాయి.',
      profitPotential: 'స్థిరమైన డిమాండ్ మరియు MSP మద్దతు కారణంగా అధిక లాభ మార్జిన్లు.'
    },
    mr: {
      name: 'तांदूळ (धान)',
      description: 'मजबूत सरकारी समर्थन आणि सातत्यपूर्ण बाजार मागणीसह भारताचे मुख्य अन्न पीक.',
      marketTrends: 'सरकारी समर्थन मूल्यासह स्थिर मागणी. निर्यात संधी उपलब्ध.',
      profitPotential: 'सातत्यपूर्ण मागणी आणि MSP समर्थनामुळे उच्च नफा मार्जिन.'
    },
    gu: {
      name: 'ચોખા (धान)',
      description: 'મજબૂત સરકારી આધાર અને સતત બજાર માંગ ���ાથે ભારતનો મુખ્ય ખાદ્ય પાક.',
      marketTrends: 'સરકારી આધાર કિંમત સાથે સ્થિર માંગ. નિકાસ તકો ઉપલબ્ધ.',
      profitPotential: 'સતત માંગ અને MSP આધારને કારણે ઉચ્ચ નફો માર્જિન.'
    },
    bn: {
      name: 'চাল (धान)',
      description: 'শক্তিশালী সরকারি সহায়তা এবং ধারাবাহিক বাজার চাহিদা সহ ভারতের প্রধান খাদ্য ফসল।',
      marketTrends: 'সরকারি সহায়তা মূল্য সহ স্থিতিশীল চাহিদা। রপ্তানির সুযোগ উপলব্ধ।',
      profitPotential: 'ধারাবাহিক চাহিদা এবং MSP সহায়তার কারণে উচ্চ লাভের মার্জিন।'
    },
    kn: {
      name: 'ಅಕ್ಕಿ (धान)',
      description: 'ಬಲವಾದ ಸರ್ಕಾರಿ ಬೆಂಬಲ ಮತ್ತು ಸ್ಥಿರವಾದ ಮಾರುಕಟ್ಟೆ ಬೇಡಿಕೆಯೊಂದಿಗೆ ಭಾರತದ ಮುಖ್ಯ ಆಹ���ರ ಬೆಳೆ.',
      marketTrends: 'ಸರ್ಕಾರಿ ಬೆಂಬಲ ಬೆಲೆಯೊಂದಿಗೆ ಸ್ಥಿರ ಬೇಡಿಕೆ. ರಫ್ತು ಅವಕಾಶಗಳು ಲಭ್ಯವಿದೆ.',
      profitPotential: 'ಸ್ಥಿರ ಬೇಡಿಕೆ ಮತ್ತು MSP ಬೆಂಬಲದಿಂದಾಗಿ ಹೆಚ್ಚಿನ ಲಾಭದ ಅಂಚುಗಳು.'
    },
    pa: {
      name: 'ਚਾਵਲ (धान)',
      description: 'ਮਜ਼ਬੂਤ ਸਰਕਾਰੀ ਸਹਾਇਤਾ ਅਤੇ ਲਗਾਤਾਰ ਮਾਰਕੀਟ ਮੰਗ ਨਾਲ ਭਾਰਤ ਦੀ ਮੁੱਖ ਭੋਜਨ ਫਸਲ।',
      marketTrends: 'ਸਰਕਾਰੀ ਸਹਾਇਤਾ ਕੀਮਤ ਨਾਲ ਸਥਿਰ ਮੰਗ। ਨਿਰਯਾਤ ਦੇ ਮੌਕੇ ਉਪਲਬਧ।',
      profitPotential: 'ਲਗਾਤਾਰ ਮੰਗ ਅਤੇ MSP ਸਹਾਇਤਾ ਕਾਰਨ ਉੱਚ ਲਾਭ ਮਾਰਜਿਨ।'
    },
    ml: {
      name: 'അരി (धान)',
      description: 'ശക്തമായ സർക്കാർ പിന്തുണയും സ്ഥിരമായ വിപണി ആവശ്യകതയും ഉള്ള ഇന്ത്യയുടെ പ്രധാന ഭക്ഷ്യ വിള.',
      marketTrends: 'സർക്കാർ പിന്തുണാ വിലയോടെ സ്ഥിരമായ ആവശ്യകത. കയറ്റുമതി അവസരങ്ങൾ ലഭ്യം.',
      profitPotential: 'സ്ഥിരമായ ആവശ്യകതയും MSP പിന്തുണയും കാരണം ഉയർന്ന ലാഭ മാർജിൻ.'
    }
  },
  '2': {
    en: {
      name: 'Wheat (गेहूं)',
      marketTrends: 'Steady demand but facing price volatility due to global markets.',
      profitPotential: 'Moderate returns with opportunity for value addition through processing.'
    },
    hi: {
      name: 'गेहूं',
      marketTrends: 'स्थिर मांग लेकिन वैश्विक बाजारों के कारण मूल्य अस्थिरता का सामना।',
      profitPotential: 'प्रसंस्करण के माध्यम से मूल्य संवर्धन के अवसर के साथ मध्यम रिटर्न।'
    },
    ta: {
      name: 'கோதுமை',
      marketTrends: 'நிலையான தேவை ஆனால் உலக சந்தைகளால் விலை நிலையின்மையை எதிர்கொள்கிறது.',
      profitPotential: 'செயலாக்கத்தின் மூலம் மதிப்பு சேர்க்கும் வாய்ப்புடன் மிதமான வருமானம்.'
    },
    te: {
      name: 'గోధుమలు',
      marketTrends: 'స్థిరమైన డిమాండ్ కానీ ప్రపంచ మార్కెట్ల కారణంగా ధర అస్థిరతను ఎదుర్కొంటోంది.',
      profitPotential: 'ప్రాసెసింగ్ ద్వారా విలువ జోడింపు అవకాశంతో మధ్యస్థ రాబడులు.'
    },
    mr: {
      name: 'गहू',
      marketTrends: 'स्थिर मागणी पण जागतिक बाजारामुळे किंमत अस्थिरता.',
      profitPotential: 'प्रक्रियेद्वारे मूल्यवर्धनाच्या संधीसह मध्यम परतावा.'
    },
    gu: {
      name: 'ઘઉં',
      marketTrends: 'સ્થિર માંગ પરંતુ વૈશ્વિક બજારોને કારણે કિંમત અસ્થિરતાનો સામનો.',
      profitPotential: 'પ્રોસેસિંગ દ્વારા મૂલ્ય વૃદ્ધિની તક સાથે મધ્યમ વળતર.'
    },
    bn: {
      name: 'গম',
      marketTrends: 'স্থিতিশীল চাহিদা কিন্তু বৈশ্বিক বাজারের কারণে দামের অস্থিরতার সম্মুখীন।',
      profitPotential: 'প্রক্রিয়াকরণের মাধ্যমে মূল্য সংযোজনের সুযোগ সহ মধ্যম রিটার্ন।'
    },
    kn: {
      name: 'ಗೋಧಿ',
      marketTrends: 'ಸ್ಥಿರ ಬೇಡಿಕೆ ಆದರೆ ಜಾಗತಿಕ ಮಾರುಕಟ್ಟೆಗಳ ಕಾರಣದಿಂದ ಬೆಲೆ ಅಸ್ಥಿರತೆಯನ್ನು ಎದುರಿಸುತ್ತಿದೆ.',
      profitPotential: 'ಸಂಸ್ಕರಣೆಯ ಮೂಲಕ ಮೌಲ್ಯ ಸೇರ್ಪಡೆ ಅವಕಾಶದೊಂದಿಗೆ ಮಧ್ಯಮ ಆದಾಯ.'
    },
    pa: {
      name: 'ਕਣਕ',
      marketTrends: 'ਸਥਿਰ ਮੰਗ ਪਰ ਗਲੋਬਲ ਮਾਰਕੀਟ ਕਾਰਨ ਕੀਮਤ ਅਸਥਿਰਤਾ ਦਾ ਸਾਮ੍ਹਣਾ।',
      profitPotential: 'ਪ੍ਰੋਸੈਸਿੰਗ ਰਾਹੀਂ ਮੁੱਲ ਵਾਧੇ ਦੇ ���ੌਕੇ ਨਾਲ ਮੱਧਮ ਰਿਟਰਨ।'
    },
    ml: {
      name: 'ഗോതമ്പ്',
      marketTrends: 'സ്ഥിരമായ ആവശ്യകത എന്നാൽ ആഗോള വിപണികൾ കാരണം വില അസ്ഥിരത നേരിടുന്നു.',
      profitPotential: 'പ്രോസസ്സിംഗിലൂടെ മൂല്യവർദ്ധനവിന്റെ അവസരങ്ങളോടെ മിതമായ വരുമാനം.'
    }
  },
  // Add more crops as needed...
};
