import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//importing components for page routings
//import SearchKeyword from "./components/SearchKeyword";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
//import CameraScan from "./components/CameraScan";
import HomePage from "./screens/HomePage";
//import ManageRecipes from "./components/ManageRecipes";
//import CreateRecipe from "./screens/CreateRecipe";
//import FoodInfo from "./components/FoodInfo";
import Welcome from "./screens/Welcome";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }}
        />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Welcome" component={Welcome} />
        
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
  search: {
    height: "5vh",

  }
});