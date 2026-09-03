const STORAGE_KEY = "avista_user_progress";

const defaultProgress = {
  version: 1,
  currentCharacterId: "av_a",
  completedCharacters: [],
  unlockedLevels: [1],
  currentLevel: 1,
  quizScores: {},
  totalScore: 0,
  streak: {
    count: 1,
    lastStudyDate: new Date().toISOString().split("T")[0],
    lastStudyTimestamp: Date.now(),
  },
  srsCards: {},
};

export function getStoredProgress() {
  if (typeof window === "undefined") return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
}

export function saveStoredProgress(progress) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("خطا در ذخیره‌سازی پیشرفت:", error);
  }
}

export function markCharacterCompleted(charId) {
  const current = getStoredProgress();
  const completed = new Set(current.completedCharacters);
  completed.add(charId);

  // به‌روزرسانی زنجیره روزانه
  const today = new Date().toISOString().split("T")[0];
  let streakCount = current.streak.count || 1;
  if (current.streak.lastStudyDate !== today) {
    const lastDate = new Date(current.streak.lastStudyDate);
    const currentDate = new Date(today);
    const diffDays = Math.round((currentDate - lastDate) / (1000 * 60 * 60 * 24));
    streakCount = diffDays === 1 ? streakCount + 1 : 1;
  }

  const updated = {
    ...current,
    currentCharacterId: charId,
    completedCharacters: Array.from(completed),
    streak: {
      count: streakCount,
      lastStudyDate: today,
      lastStudyTimestamp: Date.now(),
    },
  };

  saveStoredProgress(updated);
  return updated;
}