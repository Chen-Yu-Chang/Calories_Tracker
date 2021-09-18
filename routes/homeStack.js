import React from 'react'

// colors
import { Colors } from '../styles/global';

const { brand, darkLight, primary, tertiary} = Colors;

// React navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Welcome from '../screens/Welcome';
import BarcodeScreen from '../screens/BarcodeScreen';

//credentials context
import { CredentialsContext } from '../styles/CredentialContext';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return(
        <CredentialsContext.Consumer>
            {({storedCredentials})=> (

                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyled: {
                                backgroundColor: 'transparent'
                            },
                            headerTintColor: tertiary,
                            headerTransparent: true,
                            headerTitle: '',
                            headerLeftContainerStyle: {
                                paddingLeft: 20
                            }
                            
                        }}
                        initialRouteName="Login"
                    >    
                    {storedCredentials ? (<>
                            <Stack.Screen name="Welcome" component={Welcome} />
                            <Stack.Screen name="BarcodeScreen" component={BarcodeScreen}/>
                        </>
                        ) : (
                            <>
                                <Stack.Screen name ="Login" component={Login} />
                                <Stack.Screen name ="SignUp" component={SignUp} />
                            </>
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            )}
            
        </CredentialsContext.Consumer>

    );

}
    
export default HomeStack;
