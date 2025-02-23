import React, { useState } from "react";
import { View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    SafeAreaView,
    Image } from "react-native";
import { Link, useRouter } from 'expo-router';

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
    phoneNumber: {
      fontSize: 20,
      fontWeight: "bold",
    },
    changeText: {
      color: "blue",
      fontSize: 16,
    },
    infoText: {
      color: "#666",
      fontSize: 14,
      textAlign: "center",
      marginTop: 30,
    },
    loadingContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 7,
    },
    waitingText: {
      // marginTop:10,
      marginLeft: 6,
      color: "#666",
      // marginBottom: 30,
    },
  
    input: {
      width: "60%",
      height: 50,
      borderBottomWidth: 2,
      borderBottomColor: "#ccc",
      marginTop: 20,
      marginBottom: 5,
      fontSize: 18,
      textAlign: "center",
    },
    verifyButton: {
      marginTop: 30,
      backgroundColor: "#142863",
      paddingVertical: 15,
      width: "40%",
      alignItems: "center",
      borderRadius: 30,
    },
    verifyText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    resendText: {
      color: "#142863",
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 15,
    },
    logo: {
      width: 250,
      height: 250,
      marginTop: -120,
      marginBottom: 70,
      resizeMode: 'contain',
    },
});

const OTPLogin = () => {
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleVerifyOTP = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000); // Simulating OTP verification
    };
  
    const handleResendOTP = () => {
      console.log("Resending OTP...");
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Image source={require('../assets/images/tw-logo.png')} style={styles.logo}/>

          <Text style={styles.phoneNumber}>{phoneNumber || "8007756958"} <Text style={styles.changeText}>Change</Text></Text>
          
          <Text style={styles.infoText}>One Time Password (OTP) is sent to this number</Text>
          
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#000" />
            <Text style={styles.waitingText}>Waiting to auto read OTP</Text>
          </View>

          
          
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
            maxLength={4}
          />

          <TouchableOpacity style={styles.verifyButton} onPress={() => router.push('/loder')}>
            <Text style={styles.verifyText}>Verify OTP</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleResendOTP}>
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
          
        </View>
      </SafeAreaView>
    );
};

export default OTPLogin;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#290D85'
  },

});