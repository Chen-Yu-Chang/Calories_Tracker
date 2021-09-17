import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, Button, Image } from 'react-native';
import styles from '../styles/styles';

export default class HomePage extends React.Component {

    static navigationOptions = {
        title: 'HomePage',
    };

    render() {
        const navigate = this.props.navigation.navigate;

        return (
            <View>
                <TouchableOpacity onPress={() => navigate('Login')} style={styles.button}><Text style={styles.buttonTitle}>Log In</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('SignUp')} style={styles.button}><Text style={styles.buttonTitle}>Sign Up</Text></TouchableOpacity>
            </View>

        );
    }
}