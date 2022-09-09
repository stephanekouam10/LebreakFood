import { sButton, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { PrimaryButton, SecondaryButton, } from '../components/Button';
import COLORS from '../consts/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
//import LinearGradient from 'react-native-linear-gradient';


const LoginScreen = () => {

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
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome !</Text>
        </View>
        <Animatable.View
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
                <FontAwesome
                    name="user-o"
                    color='#05375a'
                    size={20} 
                />
                <TextInput
                    placeholder="Your Email"
                    value={email}
                    onChangeText={text => setEmail(text) }
                    style={styles.textInput}
                    autoCapitalize="none"
                />
                <Feather
                    name="check-circle"
                    color="green"
                    size={20}
                />
            </View>
            <Text style={[styles.text_footer, {marginTop: 35}]}>Password</Text>
            <View style={styles.action}>
                <FontAwesome
                    name="lock"
                    color='#05375a'
                    size={20} 
                />
                <TextInput
                    placeholder="Your Password"
                    value={Password}
                    onChangeText={text => setPassword(text) }
                    style={styles.textInput}
                    autoCapitalize="none"
                    secureTextEntry 
                />
                <Feather
                     name="eye-off"
                     color="grey"
                     size={20}
                />
            </View>
            <View style={styles.button}>
            <PrimaryButton
            onPress={handleLogin}
            title="Sign In"
            />
            </View>
            <View style={styles.button}>
            <SecondaryButton
            onPress={() => navigation.replace('Register')}
            title="Don't have account ?"
            />
            </View>
        
        </Animatable.View>   

    </View>

  )
  
}
 
export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    header: {
        flex: 1,
        justifyContent:'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5

    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#5375a',
    },
    input: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: COLORS.primary,
        marginTop: 10

    },
    button: {
        marginTop: 50
    },
    signIn: {
        width:'100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'

    }
})