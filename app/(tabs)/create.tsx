import React, { useState } from "react";
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
import Feather from "react-native-vector-icons/Feather"; // Import Feather Icons

const PostParcelScreen = () => {
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("cm"); // Default unit is cm
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const categories = [
    "Documents", "Electronics", "Fragile Items", "Perishable Goods", "Clothing & Accessories",
    "Household Items", "Furniture", "Medical Supplies", "Food & Beverages", "Automotive Parts",
    "Industrial Equipment", "Luxury Items", "Hazardous Materials", "Bulk Shipments",
    "Temperature-Sensitive Items", "Oversized Parcels", "Confidential Packages", "Retail Goods",
    "Personal Belongings", "Other"
  ];

  const units = ["cm", "ft", "inch"]; // Measurement units

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

        {/* Unit Picker (cm, ft, inch) */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={unit}
            onValueChange={(value) => setUnit(value)}
          >
            <Picker.Item label="Select Unit of Measurement" value="" />
            {units.map((item) => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        </View>

        {/* Height & Width Inputs */}
        <View style={styles.row}>
          <TextInput
            style={styles.smallInput}
            placeholder={`Height (${unit})`}
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
          <TextInput
            style={styles.smallInput}
            placeholder={`Width (${unit})`}
            keyboardType="numeric"
            value={width}
            onChangeText={setWidth}
          />
        </View>

        {/* Camera Button with Icon */}
        <Pressable style={styles.imagePicker} onPress={handleOpenCamera}>
          <Feather name="camera" size={20} color="#000" style={styles.cameraIcon} />
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
          <Text style={styles.buttonText}>Place Parcel</Text>
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
    marginTop:-200,
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    marginBottom: 20,
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
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  imagePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
    borderWidth: 2,
    borderColor: "#000",
    borderStyle: "dashed",
    borderRadius: 10,
    marginBottom: 15,
  },
  cameraIcon: {
    marginRight: 10,
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
    borderWidth: 2,
    borderColor: "#000",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    position: "absolute",
    bottom: -100,
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
