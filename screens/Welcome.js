import React, { useState } from "react";
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


const Welcome = ({ navigation, route }) => {

    // Ask about the Json file that is displayed in Login withe user information
    //const { name, email, photoUrl } = route.params;
    //const AvatarImg = photoUrl ? {uri: photoUrl} : require('../assets/welcome.png');

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

                        <StyledButton onPress={() => navigation.navigate('Login')}>  
                            <ButtonText>Logout</ButtonText>

                        </StyledButton>

                    </StyledFormArea>

                </WelcomeContainer>

            </InnerContainer>
        </>
    );
};

export default Welcome;