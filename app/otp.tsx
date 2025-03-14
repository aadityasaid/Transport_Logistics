import React, { useState } from "react";
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Image 
} from "react-native";
import { Link, useRouter, useLocalSearchParams } from 'expo-router';

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
    marginLeft: 30,
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
    marginLeft: 6,
    color: "#666",
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
    marginBottom: -30,
    resizeMode: 'contain',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});

const OTPLogin = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get phone number from navigation params
  const phoneNumber = params.phoneNumber as string;
  const countryCode = params.countryCode as string;

  const validateOTP = (otp: string) => {
    return /^\d{4}$/.test(otp);
  };

  const handleVerifyOTP = () => {
    if (!validateOTP(otp)) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }
    
    setLoading(true);
    setError("");
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push('/home');
    }, 2000);
  };

  const handleResendOTP = () => {
    console.log("Resending OTP...");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/images/tw-logo.png')} style={styles.logo}/>
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.phoneNumber}>
            {countryCode} {phoneNumber}
          </Text>
          <Text 
            style={styles.changeText} 
            onPress={() => router.push('/')}
          >
            Edit
          </Text>
        </View>

        <Text style={styles.infoText}>One Time Password (OTP) is sent to this number</Text>
        
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#000" />
            <Text style={styles.waitingText}>Verifying OTP...</Text>
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="number-pad"
          value={otp}
          onChangeText={(text) => {
            setOtp(text);
            setError("");
          }}
          maxLength={4}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity 
          style={styles.verifyButton} 
          onPress={handleVerifyOTP}
          disabled={loading}
        >
          <Text style={styles.verifyText}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleResendOTP}>
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OTPLogin;