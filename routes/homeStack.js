import React from 'react'

// colors
import { Colors } from '../styles/global';

const { brand, darkLight, primary, tertiary} = Colors;

// React navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import HomePage from '../screens/HomePage';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Welcome from '../screens/Welcome';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return(

        <NavigationContainer>
            <Stack.Navigator>   
                {/* <Stack.Screen name = "HomePage" component={HomePage} /> */}
                <Stack.Screen name ="Login" component={Login} />
                <Stack.Screen name ="SignUp" component={SignUp} />
                <Stack.Screen name="Welcome" component={Welcome} /> 

            </Stack.Navigator>
        </NavigationContainer>

    );

}
    
export default HomeStack;


// screenOptions={{
//     headerStyled: {
//         backgroundColor: 'transparent'
//     },
//     headerTintColor: tertiary,
//     headerTransparent: true,
//     headerTitle: '',
//     headerLeftContainerStyle: {
//         paddingLeft: 20
//     }
    
// }}
// initialRouteName="HomePage"