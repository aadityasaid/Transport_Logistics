import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const SettingsScreen = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
     

      <View style={styles.settingOption}>
        <Text style={styles.optionText}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <View style={styles.settingOption}>
        <Text style={styles.optionText}>Notifications</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={() => router.back()}>
        <Text style={styles.saveText}>Save Settings</Text>
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
  settingOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  optionText: {
    fontSize: 18,
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

export default SettingsScreen;
