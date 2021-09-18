import React, { useState, useContext } from 'react';
import { TouchableOpacity, Text, View, TextInput, Image, ActivityIndicator, Button, StyleSheet } from 'react-native';
import { StatusBar } from "expo-status-bar";
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
const { brand, darkLight, primary } = Colors;

// icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

// formik 
import { Formik } from "formik";

// keyboard avoiding
import KeyboardAvoidingWrapper from "../styles/keyboardavoid";

// Google
import * as Google from 'expo-google-app-auth';

// For the user to be kept logged in
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../styles/CredentialContext';

// authentication with firevbase
import auth from "../firebase/config";

export default function Login({ navigation }) {

    // Byron's Constants
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setmessageType] = useState();
    const [googleSubmitting, setGoogleSubmitting] = useState(false);

    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setmessageType(type);
    }

    // Google Sign In 
    const handleGoogleSignIn = () => {

        setGoogleSubmitting(true);

        const config = {
            iosClientId: '986150548370-k9kc9u0mus6gfhig8u8be42g116lr2la.apps.googleusercontent.com',
            scopes: ['profile', 'email']
        };

        Google
            .logInAsync(config)
            .then((result) => {
                const { type, user } = result;

                if (type == 'success') {
                    const { email, name, photoUrl } = user;
                    persistLogin({ email, name, photoUrl }, 'Google signin successful', 'SUCCESS');
                } else {
                    handleMessage('Google signin was cancelled.');
                }

                setGoogleSubmitting(false);
            })
            .catch(error => {
                console.log(error);
                handleMessage('An error occurred. Check your network and try again');
                setGoogleSubmitting(false);
            });
    }

    // to be kept logged in 
    const persistLogin = (credentials, message, status) => {
        AsyncStorage
            .setItem('ScanToKnowCredentials', JSON.stringify(credentials))
            .then(() => {
                handleMessage(message, status);
                setStoredCredentials(credentials);
            })
            .catch((error) => {
                console.log(error);
                handleMessage('Persisting Login failed');
            })
    }

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageLogo resizeMode='cover' source={require('../assets/scan.png')} />
                    <PageTitle> ScanToKnow </PageTitle>
                    <SubTitle>Account Login</SubTitle>

                    <Formik
                        initialValues={{ email: '', password: '' }}

                        onSubmit={(values) => {
                            auth.signInWithEmailAndPassword(values.email, values.password)
                                .then((userCredential) => {
                                    // Signed in 
                                    const user = userCredential.user;
                                    // navigation.navigate('Welcome');
                                    persistLogin(userCredential, message, 'SUCCESS');
                                })
                                .catch((error) => {
                                    const errorCode = error.code;
                                    const errorMessage = error.message;
                                    console.log(errorCode, errorMessage);
                                    alert(
                                        errorMessage,
                                        'Please try again',
                                        [{
                                            text: 'Try Again',
                                            onPress: () => console.log('error message displayed')
                                        }]
                                    )
                                });
                        }}

                    >{({ handleChange, handleBlur, handleSubmit, values }) => (<StyledFormArea>

                        <MyTextInput
                            label="Email Address"
                            icon="mail"
                            autoCapitalize="none"
                            placeholder="john@doe.com"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"

                        />

                        <MyTextInput
                            label="Password"
                            icon="lock"
                            placeholder="* * * * * * * * *"
                            autoCapitalize="none"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />

                        <MsgBox type={messageType}>{message}</MsgBox>

                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>Login</ButtonText>

                        </StyledButton>

                        <Line />

                        {!googleSubmitting && (
                            <StyledButton google={true} onPress={handleGoogleSignIn}>
                                <Fontisto name="google" color={primary} size={25} />
                                <ButtonText google={true}>Sign in with Google</ButtonText>
                            </StyledButton>
                        )}

                        {googleSubmitting && (
                            <StyledButton google={true} disable={true}>
                                <ActivityIndicator size="large" color={primary} />
                            </StyledButton>
                        )}

                        <ExtraView>
                            <ExtraText>Don't have an account already? </ExtraText>
                            <TextLink onPress={() => navigation.navigate("SignUp")}>
                                <TextLinkContent>Signup</TextLinkContent>
                            </TextLink>

                        </ExtraView>

                    </StyledFormArea>)}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {

    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />

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