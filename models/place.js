export class Place {
  constructor(title, imageUri, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng }; // { lat: 12.34, lng: 56.78 }
    this.id = new Date().toISOString() + Math.random().toString();
  }
}
