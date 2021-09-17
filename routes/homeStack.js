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
import Methods from '../screens/Methods';
import Barcode from '../screens/Barcode';
import Search from '../screens/Search';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return(

        <NavigationContainer>
            <Stack.Navigator>   
                <Stack.Screen name ="Login" component={Login} />
                <Stack.Screen name ="SignUp" component={SignUp} />
                <Stack.Screen name="Welcome" component={Welcome} /> 
                <Stack.Screen name="Methods" component={Methods} />
                <Stack.Screen name="Barcode" component={Barcode} />
                <Stack.Screen name="Search" component={Search} />

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