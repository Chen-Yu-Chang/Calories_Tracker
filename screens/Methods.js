import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, Button, Image } from 'react-native';
import styles from '../styles/styles';

export default class Methods extends React.Component {
    render() {
        //const navigate = this.props.navigation.navigate;
        return (
            <View>
                <Image
                    style={styles.logo}
                    source={require("../assets/welcome.png")}
                />
                {/*<TouchableOpacity onPress={() => navigate('Recipes Page', this.state.myArray)} style={styles.button}><Text style={styles.buttonTitle}>View Recipes</Text></TouchableOpacity>*/}
                <TouchableOpacity onPress={() => navigate('Barcode')} style={styles.button}><Text style={styles.buttonTitle}>Scan Items</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('Search')} style={styles.button}><Text style={styles.buttonTitle}>Search by Item Name</Text></TouchableOpacity>
                {/*<TouchableOpacity onPress={() => navigate('Create recipe')} style={styles.button}><Text style={styles.buttonTitle}>Create Recipe</Text></TouchableOpacity>*/}

            </View>

        );
    }
}