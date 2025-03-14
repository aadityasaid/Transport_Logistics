import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const EditProfileScreen = () => {
  const router = useRouter();
  const [name, setName] = useState("Prasad Jadhav");
  const [phone, setPhone] = useState("+91 8007650444");
  const [email, setEmail] = useState("prasad@example.com");

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Edit Profile</Text> */}

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.saveButton} onPress={() => router.back()}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
    justifyContent: "center",
    marginTop:-500,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default EditProfileScreen;
