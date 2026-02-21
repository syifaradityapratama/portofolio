// Override map for skill names that don't match SimpleIcons slug convention
const SLUG_OVERRIDES: Record<string, string> = {
  'next.js': 'nextdotjs',
  'nextjs': 'nextdotjs',
  'next': 'nextdotjs',

  'c++': 'cplusplus',
  'c#': 'csharp',
  'node.js': 'nodedotjs',
  'nodejs': 'nodedotjs',
  'nuxt.js': 'nuxtdotjs',
  'vue.js': 'vuedotjs',
  'three.js': 'threedotjs',
}

export function getLogoUrl(skill: { name: string; iconUrl?: string | null; websiteUrl?: string | null }) {
  if (skill.iconUrl) return skill.iconUrl;

  // Try SimpleIcons first (Transparent SVG)
  if (skill.name) {
    const normalized = skill.name.toLowerCase().trim();
    const slug = SLUG_OVERRIDES[normalized] || normalized.replace(/[.\s]+/g, "");
    return `https://cdn.simpleicons.org/${slug}`;
  }

  // Fallback to website favicon if all else fails
  if (skill.websiteUrl) {
    try {
      return `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${skill.websiteUrl}&size=128`;
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Custom smooth scroll utility with configurable duration.
 * Uses requestAnimationFrame and easeInOutQuad for a premium feel.
 */
export function smoothScrollTo(targetY: number, duration: number = 1200) {
  const startY = window.scrollY;
  const difference = targetY - startY;
  let startTime: number | null = null;

  function easeInOutQuad(t: number, b: number, c: number, d: number) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startY, difference, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}
