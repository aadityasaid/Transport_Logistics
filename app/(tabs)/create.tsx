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
  const [image, setImage] = useState<string | null>(null);

  
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
        
        
        {/* Camera Button with Icon */}
        <Pressable style={styles.imagePicker} onPress={handleOpenCamera}>
          <Feather name="camera" size={20} color="#000" style={styles.cameraIcon} />
          <Text style={styles.imagePickerText}>
            {image ? "Photo Added" : "Take a Photo"}
          </Text>
        </Pressable>

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
 
});

export default PostParcelScreen