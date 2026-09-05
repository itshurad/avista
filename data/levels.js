// data/levels.js
import { charactersData, avestanNumbers, avestanLigatures } from "./characters";

const ids = (...items) => items;

// ============ گروه‌بندی دقیق نویسه‌ها بر اساس رده‌بندی آواشناختی هوفمان ============
const level1Characters = ids("av_a", "av_aa", "av_i", "av_ii", "av_u", "av_uu");
const level2Characters = ids("av_e", "av_ee", "av_o", "av_oo", "av_schwa");
const level3Characters = ids(
  "av_schwa_long",
  "av_ao",
  "av_aao",
  "av_an",
  "av_aan",
);
const level4Characters = ids(
  "av_k",
  "av_g",
  "av_x",
  "av_xye",
  "av_xve",
  "av_gge",
  "av_gamma",
  "av_c",
  "av_j",
);
const level5Characters = ids(
  "av_t",
  "av_theta",
  "av_d",
  "av_delta",
  "av_p",
  "av_f",
  "av_b",
  "av_beta",
);
const level6Characters = ids(
  "av_ng",
  "av_ngye",
  "av_ngve",
  "av_n",
  "av_nye",
  "av_nne",
  "av_m",
  "av_hme",
);
const level7Characters = ids("av_yye", "av_y", "av_v", "av_r");
const level8Characters = ids(
  "av_s",
  "av_z",
  "av_sh",
  "av_zh",
  "av_shye",
  "av_sshe",
  "av_h",
  "av_t_final",
  "av_le",
);

const punctuationIds = ids(
  "av_abbreviation",
  "av_punctuation_colon",
  "av_punctuation_semicolon",
  "av_punctuation_sentence",
  "av_punctuation_sentence_alt",
  "av_punctuation_section",
  "av_punctuation_section_alt",
  "av_word_separator",
);

// ============ ساختار ۱۰ سطح آموزشی ============
const baseLevels = [
  // --- سطح‌های ۱ تا ۷: حروف (همانند قبل) ---
  {
    id: 1,
    slug: "foundational-vowels",
    title: "مرحلهٔ یکم: واکه‌های بنیادین",
    description: "آشنایی با واکه‌های کوتاه و بلند پایه.",
    category: "vowels",
    characterIds: level1Characters,
    numberIds: [],
    punctuationIds: [],
    ligatureIds: [],
    requiredScoreToPass: 80,
    quizEnabled: true,
  },
  {
    id: 2,
    slug: "middle-vowels",
    title: "مرحلهٔ دوم: واکه‌های میانی",
    description: "e، o و شوا به همراه صورت‌های بلند.",
    category: "vowels",
    characterIds: level2Characters,
    numberIds: [],
    punctuationIds: [],
    ligatureIds: [],
    requiredScoreToPass: 80,
    quizEnabled: true,
  },
  {
    id: 3,
    slug: "special-vowels",
    title: "مرحلهٔ سوم: واکه‌های ویژه",
    description: "واکه‌های خیشومی و ترکیبی خاص.",
    category: "vowels",
    characterIds: level3Characters,
    numberIds: [],
    punctuationIds: [],
    ligatureIds: [],
    requiredScoreToPass: 80,
    quizEnabled: true,
  },
  {
    id: 4,
    slug: "velars-affricates",
    title: "مرحلهٔ چهارم: نرم‌کامی‌ها و افریکات‌ها",
    description: "k، g، x، c، j و گونه‌های ویژهٔ آن‌ها.",
    category: "consonants",
    characterIds: level4Characters,
    numberIds: [],
    punctuationIds: [],
    ligatureIds: [],
    requiredScoreToPass: 80,
    quizEnabled: true,
  },
  {
    id: 5,
    slug: "dentals-labials",
    title: "مرحلهٔ پنجم: دندانی‌ها و لبی‌ها",
    description: "t، d، p، b و سایشی‌های مربوطه.",
    category: "consonants",
    characterIds: level5Characters,
    numberIds: [],
    punctuationIds: [],
    ligatureIds: [],
    requiredScoreToPass: 80,
    quizEnabled: true,
  },
  {
    id: 6,
    slug: "nasals",
    title: "مرحلهٔ ششم: خیشومی‌ها",
    description: "n، m، ŋ و گونه‌های کامی و لبی‌شده.",
    category: "consonants",
    characterIds: level6Characters,
    numberIds: [],
    punctuationIds: [],
    ligatureIds: [],
    requiredScoreToPass: 80,
    quizEnabled: true,
  },
  {
    id: 7,
    slug: "sonorants",
    title: "مرحلهٔ هفتم: نیم‌واکه‌ها و روان‌ها",
    description: "y، ẏ، v، r.",
    category: "consonants",
    characterIds: level7Characters,
    numberIds: [],
    punctuationIds: [],
    ligatureIds: [],
    requiredScoreToPass: 80,
    quizEnabled: true,
  },
  {
    id: 8,
    slug: "sibilants-advanced",
    title: "مرحلهٔ هشتم: صفیری‌ها و همخوان‌های پیشرفته",
    description: "s، z، š، ž، h و t̰ پایانی. (فقط حروف پیشرفته)",
    category: "advanced",
    characterIds: level8Characters,
    numberIds: [],
    punctuationIds: [],
    ligatureIds: avestanLigatures.map((l) => l.id),
    requiredScoreToPass: 80,
    quizEnabled: true,
  },

  // --- سطح ۹: مستقل برای اعداد ---
  {
    id: 9,
    slug: "avestan-numbers",
    title: "مرحلهٔ نهم: اعداد اوستایی",
    description: "واژه‌های عددی مستند از گاهان و متون کهن (یک تا هزار).",
    category: "numbers",
    characterIds: [],
    numberIds: avestanNumbers.map((n) => n.id),
    punctuationIds: [],
    ligatureIds: [],
    requiredScoreToPass: 90,
    quizEnabled: true,
    source: "Martínez & de Vaan, Introduction to Avestan, 2014",
  },

  // --- سطح ۱۰: مستقل برای علائم نگارشی ---
  {
    id: 10,
    slug: "avestan-punctuation",
    title: "مرحلهٔ دهم: علائم نگارشی و جداکننده‌ها",
    description: "نشانه‌های پایان جمله، بخش، اختصار و جداکنندهٔ واژه.",
    category: "punctuation",
    characterIds: [],
    numberIds: [],
    punctuationIds: punctuationIds,
    ligatureIds: [],
    requiredScoreToPass: 85,
    quizEnabled: true,
    source: "Unicode Standard 17.0, Chapter 10.7 Avestan",
  },
];

// ============ اعتبارسنجی ============
const usedCharacterIds = baseLevels.flatMap((l) => l.characterIds || []);
const usedPunctuationIds = baseLevels.flatMap((l) => l.punctuationIds || []);
const usedNumberIds = baseLevels.flatMap((l) => l.numberIds || []);

const findDuplicates = (items) => [
  ...new Set(items.filter((item, index) => items.indexOf(item) !== index)),
];

export const validationReport = {
  duplicateCharacterIds: findDuplicates(usedCharacterIds),
  duplicatePunctuationIds: findDuplicates(usedPunctuationIds),
  duplicateNumberIds: findDuplicates(usedNumberIds),
  isValid:
    findDuplicates(usedCharacterIds).length === 0 &&
    findDuplicates(usedPunctuationIds).length === 0 &&
    findDuplicates(usedNumberIds).length === 0,
};

export const levelsData = baseLevels;
export default baseLevels;
