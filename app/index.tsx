import React, { useState } from "react";
import {
    Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Link, useRouter } from 'expo-router';


const LoginScreen = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogin = () => {
    console.log("Phone Number:", phoneNumber);
  };

  return (
    
    <SafeAreaView style={styles.container}>
      
      <View style={styles.content}>
        <Image source={require('../assets/images/tw-logo.png')} style={styles.logo}/>
        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter mobile number"
            keyboardType="number-pad"
            maxLength={10}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/otp')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.sign_up_text_button}>Don't have an account?</Text>
        <Link href="/signup" style={styles.button}>
          Sign up now
        </Link>

        

        <Link href="/home" style={styles.h123}>
         home
        </Link>




      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  content: {
    alignItems: "center",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 20,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "90%",
    paddingVertical: 5,
  },
  countryCode: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  input: {
    fontSize: 18,
    flex: 1,
    color: "#333",
  },
  loginButton: {
    marginTop: 30,
    backgroundColor: "#142863",
    paddingVertical: 15,
    width: "80%",
    alignItems: "center",
    borderRadius: 30,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    width: 250,
    height: 250,
    marginTop: -250,
    marginBottom: 50,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#290D85'
  },
  sign_up_text_button: {
    position: 'absolute',
    bottom: -170,
    fontSize: 17,
    color: '#808080',
  },
  button: {
    position: 'absolute',
    bottom: -200,
    fontSize: 17,
    color: '#0000FF',
  },
  h123: {
  marginTop:20,
  fontSize:20,
  color: '#0000FF',
  fontFamily: 'Poppins',
  fontWeight: 'bold',
  },
});

export default LoginScreen;
