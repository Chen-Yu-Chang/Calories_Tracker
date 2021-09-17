import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { auth, store } from '../firebase/config'
var cal_total = 0;
var food_name = "";
//Barcode function 
const BarcodeScreen = () => {
    //Initializing permissions for the barcode scanner
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    //addData method will add the .json file to the Firestore database
    addData = (data) => {
        //All entries placed in food_items collection
        store.collection('food_items')
            .add(data)
    }

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            //Updated the status to granted...allows user to use barcode scanner
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        
        Alert.alert("Barcode scanned!");
        
        //Function will call FDA API with data
        API(data.substring(1));
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    //If the user's permission is false...text informs user no camera permission
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    //Return will just be full camera view with number pad after scan
    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
}

API = (inputData) => {
    store.collection('food_items')
    fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${inputData}&api_key=rWHPsCB2ff4NMvi9DBJKvL2Czq8nHyMXpXmRrpwL`)
        .then(response => response.json())
        .then(
            data => {
                console.log(data)
                //Add data to database
                addData(data);
            })
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});

export { BarcodeScreen as default, cal_total, food_name };