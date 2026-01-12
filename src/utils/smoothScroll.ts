export const smoothScrollTo = (targetSelector: string) => {
  const target = document.querySelector(targetSelector);
  if (!target) {
    console.error(`Element not found: ${targetSelector}`);
    return;
  }

  target.scrollIntoView({ behavior: 'smooth' });
};
