import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
        <View>
            <Text style={styles.body2}>
                Total Calories: {calories}
            </Text>
            <Text style={styles.body2}>
                Food: {food}
            </Text>
            <StyledButton onPress={() => navigation.navigate('BarcodeScreen')}>
                <ButtonText>Scan Items</ButtonText></StyledButton>
        </View>
    )
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 40
    },
    body: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 20
    },
    body2: {
        fontSize: 25,
        textAlign: 'left',
        marginTop: 100
    }
});

export default Recipe;