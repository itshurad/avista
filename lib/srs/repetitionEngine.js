import {
  getStoredProgress,
  saveStoredProgress,
} from "@/lib/storage/progressStore";

const INTERVAL_DAYS = [1, 3, 7, 14, 30];

export function updateCardSRS(characterId, isCorrect) {
  const progress = getStoredProgress();
  const currentCard = progress.srsCards?.[characterId] || {
    stage: 0,
    nextReviewTimestamp: Date.now(),
    mistakes: 0,
    successes: 0,
  };

  let nextStage;
  if (isCorrect) {
    nextStage = Math.min(currentCard.stage + 1, INTERVAL_DAYS.length - 1);
  } else {
    nextStage = 0; // بازگشت به آغاز چرخه در صورت خطا
  }

  const daysToAdd = INTERVAL_DAYS[nextStage];
  const nextReviewTimestamp = Date.now() + daysToAdd * 24 * 60 * 60 * 1000;

  const updatedProgress = {
    ...progress,
    srsCards: {
      ...progress.srsCards,
      [characterId]: {
        stage: nextStage,
        nextReviewTimestamp,
        mistakes: isCorrect ? currentCard.mistakes : currentCard.mistakes + 1,
        successes: isCorrect
          ? currentCard.successes + 1
          : currentCard.successes,
      },
    },
  };

  saveStoredProgress(updatedProgress);
  return updatedProgress;
}

export function getDueReviewCharacters(allCharacters) {
  const progress = getStoredProgress();
  const now = Date.now();
  const srs = progress.srsCards || {};

  return allCharacters.filter((char) => {
    const card = srs[char.id];
    if (!card) return false;
    return card.nextReviewTimestamp <= now;
  });
}
