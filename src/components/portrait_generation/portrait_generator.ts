import multiavatar from '@multiavatar/multiavatar/esm';

export const generatePortrait = (code: string) => {
  try {
    const svg = multiavatar(code); // returns SVG string
    const svgUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    return svgUrl;
  } catch (err) {
    console.error('generatePortrait error:', err);
    return null; // or a fallback image URL
  }
};
