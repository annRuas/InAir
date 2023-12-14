import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/Screens/Login';
import Signup from './src/Screens/Signup';
import Welcome from './src/Screens/Welcome';
import Welcome2 from './src/Screens/Welcome2';
import HomeAq from './src/Screens/HomeAq';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='HomeAq'
      >
      <Stack.Screen 
        name="Welcome" 
        component={Welcome} 
        options={{
          headerShown:false
        }}
        />

      <Stack.Screen 
        name="Welcome2" 
        component={Welcome2} 
        options={{
          headerShown:false
        }}
        />

        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{
            headerShown:false
          }}
        />

        <Stack.Screen 
          name="Signup"  
          component={Signup}
          options={{
            headerShown:false
          }} 
        />

        <Stack.Screen 
          name="HomeAq"  
          component={HomeAq}
          options={{
            headerShown:false
          }} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
