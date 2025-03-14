import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const AddUPIScreen = () => {
  const router = useRouter();
  const [upiID, setUpiID] = useState("");

  return (
    <View style={styles.container}>
      
    

      {/* Input Label */}
      <Text style={styles.label}>UPI ID/ VPA</Text>

      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder="e.g SayliKaushalPatil@upi"
        placeholderTextColor="#A0A0A0"
        value={upiID}
        onChangeText={setUpiID}
      />

      {/* Subtext */}
      <Text style={styles.subText}>A Collect request will be sent to this UPI ID</Text>

      {/* Verify and Pay Button */}
      <TouchableOpacity
        style={[styles.button, { opacity: upiID ? 1 : 0.35 }]}
        disabled={!upiID}
      >
        <Text style={styles.buttonText}>Verify And Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5FA",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  backArrow: {
    fontSize: 29,
    color: "black",
    fontWeight:"bold",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#290D85",
    marginTop: 30,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#290D85",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "black",
    backgroundColor: "white",
  },
  subText: {
    fontSize: 14,
    color: "gray",
    marginTop: 8,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#290D85",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    width: "70%",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default AddUPIScreen;
