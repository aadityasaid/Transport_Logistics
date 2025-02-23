import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

const PostParcelScreen = () => {
  const [category, setCategory] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const categories = ["Documents", "Electronics", "Fragile Items", "Perishable Goods", "Clothing & Accessories", "Household Items", "Furniture", "Medical Supplies", "Food & Beverages", "Automotive Parts", "Industrial Equipment", "Luxury Items", "Hazardous Materials", "Bulk Shipments", "Temperature-Sensitive Items", "Oversized Parcels", "Confidential Packages", "Retail Goods", "Personal Belongings", "Other"];

  // Open Camera with Permission Handling
  const handleOpenCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Camera access is required to take photos.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        

        {/* Category Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(value) => setCategory(value)}
          >
            <Picker.Item label="Category of Parcel" value="" />
            {categories.map((item) => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        </View>

        {/* Height & Width Inputs */}
        <View style={styles.row}>
          <TextInput
            style={styles.smallInput}
            placeholder="Height (cm)"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
          <TextInput
            style={styles.smallInput}
            placeholder="Width (cm)"
            keyboardType="numeric"
            value={width}
            onChangeText={setWidth}
          />
        </View>

        {/* Camera Button */}
        <Pressable style={styles.imagePicker} onPress={handleOpenCamera}>
          <Text style={styles.imagePickerText}>
            {image ? "Photo Added" : "Take a Photo"}
          </Text>
        </Pressable>

        {/* Pickup and Destination Inputs */}
        <TextInput
          style={styles.inputGray}
          placeholder="Enter Pick-Up"
          value={pickup}
          onChangeText={setPickup}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Destination"
          value={destination}
          onChangeText={setDestination}
        />

        {/* Place Order Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Place Order</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pickerContainer: {
    marginTop: -250,
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  smallInput: {
    width: "48%",
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  imagePicker: {
    width: "100%",
    height: 60,
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "dashed",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  imagePickerText: {
    fontSize: 16,
    color: "#000",
  },
  inputGray: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#D3D3D3",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    position: "absolute",
    bottom: -170,
    // left: "50%",
    // transform: [{ translateX: -37.5 }], // Center the button horizontally
    marginTop: 10,
    backgroundColor: "#142863",
    paddingVertical: 15,
    width: "75%",
    alignItems: "center",
    borderRadius: 70,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PostParcelScreen;
