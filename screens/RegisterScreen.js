import { Button, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {

    const [email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })
        return unsubscribe
    }, [])


    const handleSignUp = () => {
        auth
        .createUserWithEmailAndPassword(email, Password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Register with :', user.email);
        })
        .catch(error => alert(error.message))
    }

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, Password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with :', user.email);
            })
            .catch(error => alert(error.message))
    }


  return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">
        <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text) }
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              value={Password}
              onChangeText={text => setPassword(text)}
              style={styles.input}
              secureTextEntry
            />
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleSignUp}
              style={[styles.button, styles.buttonOutLine]}
            >
                <Text style={styles.buttonOutLineText}>Register</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%'

    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 10,
        marginTop: 10

    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40

    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'

    },
    buttonOutLine: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 3

    },  
    buttonOutLineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,

    },
})