import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import Map from './screens/Map';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import { useEffect, useState, useCallback } from 'react';
import { init } from './util/database';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInit, setDbInit] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await init();
        // Artificially delay for two seconds to simulate a slow loading experience
        // await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (err) {
        console.error('Failed to initialize the database:', err);
      } finally {
        setDbInit(true);
      }
    }

    prepare();
  }, []);

  if (dbInit) {
    SplashScreen.hideAsync();
  }

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon='add'
                  size={24}
                  color={tintColor}
                  onPress={() => {
                    navigation.navigate('AddPlace');
                  }}
                />
              ),
            })}
          />
          <Stack.Screen
            name='AddPlace'
            component={AddPlace}
            options={{ title: 'Add a new Place', headerBackTitle: 'Back' }}
          />
          <Stack.Screen name='Map' component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
