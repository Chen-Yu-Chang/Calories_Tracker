import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";

// icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import {
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    WelcomeImage,
    Avatar,

} from "../styles/global";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../styles/CredentialContext';

const Welcome = ({ navigation, route }) => {

    // Ask about the Json file that is displayed in Login withe user information
    //const { name, email, photoUrl } = route.params;
    //const AvatarImg = photoUrl ? {uri: photoUrl} : require('../assets/welcome.png');

    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

    const ClearLogin = () => {
        AsyncStorage
            .removeItem('ScanToKnowCredentials')
            .then(() => {
                setStoredCredentials("");
            })
            .catch( error => console.log(error))
    }

    return (
        <>
            <StatusBar style="dark" />
            <InnerContainer>
                <WelcomeImage resizeMode='cover' source={require('../assets/welcome.png')} />
                <WelcomeContainer>

                    <PageTitle welcome={true}> Welcome! </PageTitle>
                    {/* <SubTitle welcome={true}>{name || 'Byron Mitchell'}</SubTitle>
                    <SubTitle welcome={true}>{email || 'byronmit@bu.edu'}</SubTitle> */}

                    <StyledFormArea>
                        <Avatar resizeMode='cover' source={require('../assets/welcome.png')} />

                        <Line />

                        <StyledButton onPress={() => navigation.navigate('BarcodeScreen')}>  
                            <ButtonText>Scan Items</ButtonText></StyledButton>

                        <StyledButton onPress={ClearLogin}>  
                            <ButtonText>Logout</ButtonText></StyledButton>

                    </StyledFormArea>

                </WelcomeContainer>

            </InnerContainer>
        </>
    );
};

export default Welcome;