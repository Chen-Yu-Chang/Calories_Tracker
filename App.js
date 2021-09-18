import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';

import HomeStack from './routes/homeStack';

//app loading
import AppLoading from 'expo-app-loading';

// async - storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from './styles/CredentialContext';


export default function App() {

  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  const checkLoginCredential = () => {
    AsyncStorage
    .getItem('ScanToKnowCredentials')
    .then((result) => {
      if (result !== null) {
        setStoredCredentials(JSON.parse(result));
      } else {
        setStoredCredentials(null);
      }
    })
    .catch(error => console.log(error))
  }

  if(!appReady){
    return (<AppLoading
      startAsync={checkLoginCredential}
      onFinish={()=> setAppReady(true)}
      onError={console.warn}
    />)
  }


  return (
    <CredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}>
      <HomeStack/>
    </CredentialsContext.Provider>
  );
}