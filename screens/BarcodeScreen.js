//BarcodeScreen.js

//Modules needed for BarcodeScreen.js
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';

//Import Barcode Scanner Module
import { BarCodeScanner } from 'expo-barcode-scanner';

//Import Firebase auth and db fields from the Firebase.js file
import { auth, db } from '../firebase/config'

//Global variables cal_total and food_name used to track number of calories and most recent food scanned
var cal_total = 0;
var food_name = "";

//Barcode Screen function 
const BarcodeScreen = () => {
    //Initializing permissions for the barcode scanner
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    //addData method will add the .json file to the Firestore database
    addData = (data) => {
        //All entries placed in food_items collection
        db.collection('food_items')
            .add(data)
    }

    //getCalories function will parse the number of calories from the .json file and add to the global variable
    getCalories = (data) => {
        var calories = data.foods[0].foodNutrients[3].value;
        console.log(calories);
        return calories;
    }

    //getFoodName function will parse the food description from the .json file and add to the global variable
    getFoodName = (data) => {
        var food_name = data.foods[0].description;
        console.log(food_name);
        return food_name;
    }

    //useEffect function will update status of user camera access
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            //Updated the status to granted...allows user to use barcode scanner
            setHasPermission(status === 'granted');
        })();
    }, []);

    //Function handleBarCodeScanned will process the data and call the FDA API 
    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);

        //handleInput will display the servingSize value
        //NOTE: servingSize is still undefined
        async function handleInput() {
            let input = '';
            console.log(input);
            input = await getInput();
            console.log(input);
            return input;
        };

        //getInput will use a number pad to get input from the user on the number of servings
        //NOTE: servingSize is still undefined
        function getInput() {
            return new Promise((resolve) => {
                const servingSize = Alert.prompt(
                    "Barcode scanned!",
                    "Please enter number of servings",
                    undefined, undefined, '0', 'number-pad'
                );
                resolve(servingSize);
            });
        };

        //Call to asynchronous function 
        handleInput();

        //Function will call FDA API with data
        APIHandler(data.substring(1));
    };

    //If the user's permission is null...text asks for camera permission
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

//APIHandler function will take the input data, fetch from the FDA API, and convert to .json format
APIHandler = (inputData) => {
    db.collection('food_items')
    fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${inputData}&api_key=DEMO_KEY`)
        .then(response => response.json())
        .then(
            data => {
                console.log(data)

                //Add data to database
                addData(data);

                //Calculate calories from .json
                var calories = getCalories(data);
                //Add to the global variable
                cal_total = cal_total + calories;

                //Calculate food description from .json
                var fname = getFoodName(data);
                //If not empty...global variable becomes empty, then initialized to fname
                if (food_name != "") {
                    food_name == "";
                    food_name = fname;
                }
                //Else global variable initialized to fname
                else {
                    food_name = fname;
                }

                //If the user signs out of the app...global variables reset
                auth.onAuthStateChanged((user) => {
                    if (!user) {
                        cal_total = 0;
                        food_name = "";
                    }
                });
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