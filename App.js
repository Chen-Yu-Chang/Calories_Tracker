import { StatusBar } from 'expo-status-bar';
import React from 'react';

//importing components for page routings
//import SearchKeyword from "./components/SearchKeyword";
//import CameraScan from "./components/CameraScan";
//import ManageRecipes from "./components/ManageRecipes";
//import CreateRecipe from "./screens/CreateRecipe";
//import FoodInfo from "./components/FoodInfo";

import HomeStack from './routes/homeStack';


export default function App() {
  return (
    <HomeStack/>
  );
}