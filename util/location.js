export function getMapPreview(latitude, longitude) {
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${latitude},${longitude}&key=${apiKey}`;
  return imagePreviewUrl;
}
