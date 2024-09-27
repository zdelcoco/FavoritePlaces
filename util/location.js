const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

export function getMapPreview(latitude, longitude) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${latitude},${longitude}&key=${apiKey}`;
  return imagePreviewUrl;
}

export async function getAddress(latitude, longitude) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch address!');
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;
}
