export async function shareCharacter({ glyph, name, url }) {
  const shareText = `من در آویستا در حال یادگیری دبیرهٔ اوستایی هستم.\nنویسهٔ امروز: ${glyph} (${name})\n`;
  const fullUrl =
    url ||
    (typeof window !== "undefined"
      ? window.location.href
      : "https://avista.ir");

  // بهره‌گیری از Web Share API در صورت پشتیبانی مرورگر
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({
        title: `آویستا | نویسهٔ ${name}`,
        text: shareText,
        url: fullUrl,
      });
      return { success: true, method: "native" };
    } catch {
      // کاربر دیالوگ را لغو کرده یا خطا رخ داده است
    }
  }

  return { success: false, method: "fallback" };
}

export function getShareUrls({ glyph, name, url }) {
  const targetUrl = encodeURIComponent(
    url ||
      (typeof window !== "undefined"
        ? window.location.href
        : "https://avista.ir"),
  );
  const text = encodeURIComponent(
    `آشنایی با نویسهٔ «${glyph}» (${name}) در دبیرهٔ اوستایی عبر آویستا:`,
  );

  return {
    telegram: `https://t.me/share/url?url=${targetUrl}&text=${text}`,
    x: `https://twitter.com/intent/tweet?url=${targetUrl}&text=${text}`,
  };
}
