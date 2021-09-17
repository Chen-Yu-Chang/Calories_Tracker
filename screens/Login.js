import React, { useState } from 'react';
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
const { brand, darkLight, primary} = Colors;

// icons
import { Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

// formik 
import { Formik } from "formik";

// keyboard avoiding
import KeyboardAvoidingWrapper from "../styles/keyboardavoid";

// Google
import * as Google from 'expo-google-app-auth';

// Partner's Import 
import auth from "../firebase/config";
import styles from '../styles/styles';

export default function Login({ navigation }) {

    const [email, setEmail] = useState(0);
    const [password, setPassword] = useState(0);

    // Byron's Constants
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setmessageType] = useState();

    const handleMessage = (message, type ='FAILED') => {
        setMessage(message);
        setmessageType(type);
    }

    // Google Sign In 
    const [googleSubmitting, setGoogleSubmitting] = useState(false);

    const handleGoogleSignIn = () => {

        setGoogleSubmitting(true);

        const config = {
            iosClientId: '986150548370-k9kc9u0mus6gfhig8u8be42g116lr2la.apps.googleusercontent.com',
            scopes: ['profile', 'email']
        };

        Google
        .logInAsync(config)
        .then((result)=> {
            const {type, user} = result;

            if (type == 'success'){
                const { email, name, photoUrl} = user;
                handleMessage('Google signin successfule', 'SUCCESS');
                setTimeout(()=> navigation.navigate('Welcome', {email, name, photoUrl}), 1000);
            } else{
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

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark"/>
                <InnerContainer>
                    <PageLogo resizeMode='cover' source={require('../assets/scan.png')} />
                    <PageTitle> ScanToKnow </PageTitle>
                    <SubTitle>Account Login</SubTitle>

                    <Formik
                        initialValues={{email: '', password: ''}}

                        onSubmit ={ (values) => {
                            auth.signInWithEmailAndPassword(values.email, values.password)
                                .then( (userCredential) => {
                                    // Signed in 
                                    const user = userCredential.user;
                                    console.log(user);
                                    navigation.navigate('Welcome');
                                    // ...
                                })
                                .catch( (error) => {
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
                                <TextLink onPress={() => navigation.navigate("Signup")}>
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













{/* <TextInput
                        style={styles.input}
                        placeholder='E-mail'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#aaaaaa"
                        secureTextEntry
                        placeholder='Password'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            auth.signInWithEmailAndPassword(email, password)
                                .then((userCredential) => {
                                    // Signed in 
                                    const user = userCredential.user;
                                    console.log(user);
                                    setEmail('');
                                    setPassword('');
                                    navigation.navigate('Welcome');
                                    // ...
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
                        }}>
                        <Text style={styles.buttonTitle}>Log in</Text>
                    </TouchableOpacity> */}