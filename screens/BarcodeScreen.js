import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { auth, store } from '../firebase/config'

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



//Barcode function 
const BarcodeScreen = () => {
    //Initializing permissions for the barcode scanner
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned');

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            //Updated the status to granted...allows user to use barcode scanner
            setHasPermission(status === 'granted');
        })();

    }

    useEffect(() => {
        askForCameraPermission();
    }, []);

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>
        )
    }
    //If the user's permission is false...text informs user no camera permission
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{margin:10}}>No access to camera</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()}/>
            </View>
        )
    }

    // Funcions to handle scanned state
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        // setText(data);
        //console.log('Type: ' + type + '\nData: ' + data)
        
        Alert.alert("Barcode scanned!");
        
        //Function will call FDA API with data
        API(data.substring(1));
    };

    const API = (inputData) => {
        store.collection('food_items')
        fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${inputData}&api_key=rWHPsCB2ff4NMvi9DBJKvL2Czq8nHyMXpXmRrpwL`)
            .then(response => response.json())
            .then(
                data => {
                    console.log(data.foods[0].foodNutrients[3].value)
                    setText('Food: ' + data.foods[0].brandName + '\nCalories: ' + data.foods[0].foodNutrients[3].value)
                    //Add data to database
                    addData(data);
                })
    }

    //addData method will add the .json file to the Firestore database
    addData = (data) => {
        //All entries placed in food_items collection
        store.collection('food_items')
            .add(data)
    }

    //Return will just be full camera view with number pad after scan
    return (
        <View style={styles.container}>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 400, width: 400}}
                />
            </View>
            <Text style={styles.maintext}>{text}</Text>
            {scanned && <StyledButton onPress={() => setScanned(false)}><ButtonText>Scan Again</ButtonText></StyledButton>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato'
    },

    maintext: {
        fontSize: 16,
        margin: 20,
    }

});

export default BarcodeScreen;