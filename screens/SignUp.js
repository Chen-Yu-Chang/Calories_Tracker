import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, Text, View, TextInput, Image, Alert } from 'react-native';

// For UI
import {
    Colors,
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea, 
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent


} from "../styles/global";

// colors
const { brand, darkLight, primary} = Colors;

// keyboard avoid
import KeyboardAvoidingWrapper from "../styles/keyboardavoid";

// icons
import { Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

// formik 
import { Formik } from "formik";

// Partner's BackeEnd?
const axios = require("axios");
import auth from "../firebase/config";
import styles from '../styles/styles';

const axiosConfig = {
    headers: {
        "content-type": "application/json",
    }
};



export default function SignUp({ navigation }) {

    const [hidePassword, setHidePassword] = useState(true);

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark"/>
                <InnerContainer>
                    <PageTitle> ScanToKnow </PageTitle>
                    <SubTitle>Account Signup</SubTitle>

                    <Formik
                        initialValues={{email: '', password: ''}}

                        onSubmit ={ (values) => {
                            auth.createUserWithEmailAndPassword(values.email, values.password)
                            .then( (userCredential) => {
                                // Signed in 
                                const user = userCredential.user;
                                console.log(user);
                                Alert.alert(
                                    'Registration succeeded',
                                    'Please log in now',
                                    [{
                                        text: 'Go back to Log In',
                                        onPress: () => navigation.navigate("Login")
                                    }]
                                )

                            })
                            .catch( (error) => {
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                console.log(errorCode, errorMessage);
                                Alert.alert(
                                    errorMessage,
                                    'Please try again',
                                    [{
                                        text: 'Try Again',
                                        onPress: () => console.log('error message displayed')
                                    }]
                                )
                                // ..
                            });
                        }}

                    >{({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea> 

                            <MyTextInput 
                                label="Email Address" 
                                icon="mail"
                                placeholder="john@doe.com"
                                placeholderTextColor={darkLight}
                                onChangeText = {handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"

                            /> 

                            <MyTextInput 
                                label="Password" 
                                icon="lock"
                                placeholder="* * * * * * * * *"
                                placeholderTextColor={darkLight}
                                onChangeText = {handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />

                            <MsgBox>...</MsgBox>

                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Register</ButtonText>

                            </StyledButton>

                            <Line />

                            <ExtraView>
                                <ExtraText>Already have an account? </ExtraText>
                                <TextLink onPress={() => navigation.navigate('Login')}>
                                    <TextLinkContent>Login</TextLinkContent>
                                </TextLink>

                            </ExtraView>

                        </StyledFormArea>)}  
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {

    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand}/>

            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}

        </View>

    );
};














// return (
//     <View>
//         <TextInput
//             style={styles.input}
//             placeholder='E-mail'
//             placeholderTextColor="#aaaaaa"
//             onChangeText={(text) => setEmail(text)}
//             value={email}
//             underlineColorAndroid="transparent"
//             autoCapitalize="none"
//         />
//         <TextInput
//             style={styles.input}
//             placeholderTextColor="#aaaaaa"
//             secureTextEntry
//             placeholder='Password'
//             onChangeText={(text) => setPassword(text)}
//             value={password}
//             underlineColorAndroid="transparent"
//             autoCapitalize="none"
//         />
//         <TouchableOpacity
//             style={styles.button}
//             onPress={() => {
//                 auth.createUserWithEmailAndPassword(email, password)
//                     .then((userCredential) => {
//                         // Signed in 
//                         const user = userCredential.user;
//                         console.log(user);
//                         Alert.alert(
//                             'Registration succeeded',
//                             'Please log in now',
//                             [{
//                                 text: 'Go back to Log In',
//                                 onPress: () => navigation.navigate("Home page")
//                             }]
//                         )

//                     })
//                     .catch((error) => {
//                         const errorCode = error.code;
//                         const errorMessage = error.message;
//                         console.log(errorCode, errorMessage);
//                         Alert.alert(
//                             errorMessage,
//                             'Please try again',
//                             [{
//                                 text: 'Try Again',
//                                 onPress: () => console.log('error message displayed')
//                             }]
//                         )
//                         // ..
//                     });
//             }}>
//             <Text style={styles.buttonTitle}>Register</Text>
//         </TouchableOpacity>
//     </View>
// );