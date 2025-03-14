import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, BackHandler } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const router = useRouter();

  const handleLogout = () => {
    BackHandler.exitApp(); // Exit the app on logout
  };

  return (
    <View style={styles.container}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image source={require("../../assets/images/box.png")} style={styles.profileImage} />
        <Text style={styles.name}>Prasad Jadhav</Text>
        <Text style={styles.phone}>+91 8007650444</Text>
        <Text style={styles.email}>prasad@example.com</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={() => router.push("/edit-profile")}>
          <Feather name="edit" size={22} color="#333" />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => router.push("/settings")}>
          <Feather name="settings" size={22} color="#333" />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  profileCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: "100%",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  phone: {
    fontSize: 16,
    color: "#777",
    marginTop: 5,
  },
  email: {
    fontSize: 16,
    color: "#777",
    marginTop: 5,
  },
  optionsContainer: {
    width: "100%",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
    elevation: 4,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 18,
    marginLeft: 15,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#d32f2f",
    width: "100%",
    padding: 15,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  logoutText: {
    fontSize: 18,
    color: "white",
    marginLeft: 10,
  },
});

export default ProfileScreen;
