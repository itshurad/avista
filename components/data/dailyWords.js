export const dailyWords = [
  {
    word: "𐬀𐬴𐬀",
    transliteration: "aṣ̌a",
    meaning: "راستی، راستیِ مطلق و سامانِ کیهانی",
    pronunciation: "اَشَه",
    relatedCharacter: "𐬀",
    note: "بنیادی‌ترین مفهوم اخلاقی و کیهان‌شناختی در اندیشهٔ باستانی ایران که ستون حقیقت را شکل می‌دهد."
  },
  {
    word: "𐬁𐬙𐬀𐬭",
    transliteration: "ātar",
    meaning: "آذر، فروغ، آتشِ زنده و پاکیزگی",
    pronunciation: "آتَر",
    relatedCharacter: "𐬁",
    note: "نماد روشنایی، گرما و خرد برانگیزاننده در متون کهن ایرانی."
  },
  {
    word: "𐬎𐬱𐬙𐬀",
    transliteration: "ušta",
    meaning: "روشنایی درونی، شادکامی راستین و آسایش",
    pronunciation: "اوشتا",
    relatedCharacter: "𐬀",
    note: "شادکامی که از پی نیکی رساندن به دیگران به دست می‌آید؛ از پایه‌های سرودهای گاهانی."
  }
];

export function getWordOfTheDay() {
  // انتخاب واژه پایدار روزانه بر مبنای تقویم بدون نیاز به سرور
  const today = new Date();
  const dayIndex = (today.getFullYear() * 365 + today.getMonth() * 31 + today.getDate()) % dailyWords.length;
  return dailyWords[dayIndex];
}