import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, Text, View, Button, Image } from 'react-native';
import styles from '../styles/styles';

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


const Methods = ({ navigation, route }) => {
    return (
        <>
            <StatusBar style="dark" />
            <InnerContainer>
                <WelcomeImage resizeMode='cover' source={require('../assets/welcome.png')} />
                <WelcomeContainer>

                    <StyledFormArea>
                        <Avatar resizeMode='cover' source={require('../assets/welcome.png')} />

                        <Line />

                        <StyledButton onPress={() => navigation.navigate('Recipe')}>
                            <ButtonText>Make Recipe</ButtonText></StyledButton>

                    </StyledFormArea>

                </WelcomeContainer>

            </InnerContainer>
        </>
    );
};

export default Methods;