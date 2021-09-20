import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { auth } from '../firebase/config';
import { calories, food } from './BarcodeScreen';
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

const Recipe = ({ navigation, route }) => {

    return (
        <SafeAreaView>
            <SubTitle>
                Total Calories: {calories}
            </SubTitle>
            <SubTitle>
                Food: {food}
            </SubTitle>
            <StyledButton onPress={() => navigation.navigate('BarcodeScreen')}>
                <ButtonText>Scan Items</ButtonText></StyledButton>
        </SafeAreaView>
    )
}

export default Recipe;