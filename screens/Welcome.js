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


const Welcome = ({ navigation }) => {
    return (
        <>
            <StatusBar style="dark" />
            <InnerContainer>
                <WelcomeImage resizeMode='cover' source={require('../assets/welcome.png')} />
                <WelcomeContainer>

                    <PageTitle welcome={true}> Welcome! </PageTitle>

                    <StyledFormArea>
                        <Avatar resizeMode='cover' source={require('../assets/scan.png')} />

                        <Line />

                        <StyledButton onPress={() => navigation.navigate('Recipe')}>
                            <ButtonText>Start</ButtonText>

                        </StyledButton>

                    </StyledFormArea>

                </WelcomeContainer>

            </InnerContainer>
        </>
    );
};

export default Welcome;