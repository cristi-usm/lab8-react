const FALLBACK =
  "https://via.placeholder.com/600x400?text=No+Image";

export function getArtworkImageUrl(imageId, width = 843) {
  if (!imageId) return FALLBACK;
  return `https://www.artic.edu/iiif/2/${imageId}/full/${width},/0/default.jpg`;
}