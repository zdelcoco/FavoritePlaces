import { Alert, StyleSheet } from 'react-native';
import { useState, useLayoutEffect, useCallback } from 'react';
import MapView, { Marker } from 'react-native-maps';

import IconButton from '../components/UI/IconButton';

function Map({ navigation, route, readOnly }) {
  const [selectedLocation, setSelectedLocation] = useState(
    route.params?.initialLocation
  );

  const region = {
    latitude: route.params?.initialLocation
      ? route.params?.initialLocation.lat
      : 37.78,
    longitude: route.params?.initialLocation
      ? route.params?.initialLocation.lng
      : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    if (route.params?.readOnly) {
      return;
    }

    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked!',
        'You have to pick a location by tapping on the map first!'
      );
      return;
    }

    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (route.params?.readOnly) {
      return;
    }
    console.log(navigation.getParent());
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon='save'
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title='Picked Location'
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
