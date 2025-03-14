import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const images = [
  require("../assets/images/box.png"),
  require("../assets/images/box.png"),
  require("../assets/images/box.png"),
];

const HistoryScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = new Animated.Value(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500); // 1.5 sec interval

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerTitle}>History</Text>
      </TouchableOpacity>

      {/* Image Slider */}
      <View style={styles.imageContainer}>
        <Image source={images[currentIndex]} style={styles.image} />
      </View>

      {/* Parcel Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Category: <Text style={styles.boldText}>Electronics</Text></Text>
        <Text style={styles.subText}>Posted 2 hours ago</Text>

        <Text style={styles.sectionTitle}>Parcel Details:</Text>
        <Text style={styles.subText}>Dimensions: 30cm x 30cm x 20cm</Text>
        <Text style={styles.subText}>Weight: 5Kg</Text>

        <Text style={styles.sectionTitle}>Driver Details:</Text>

        {/* Driver Card */}
        <View style={styles.card}>
          <Text style={styles.cardText}>
            <MaterialIcons name="person" size={18} color="#333" />  
            <Text style={styles.boldText}> Bidder: Satish More</Text>
          </Text>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={20} color="gold" />
            <Text style={styles.ratingText}> 4.0 (20)</Text>
          </View>
          <Text style={styles.cardSubText}>Time: 12:05 PM</Text>
          <Text style={styles.cardSubText}>Date: 24/06/2024</Text>
          <Text style={styles.cardSubText}>Contact: 9302535457</Text>
          <Text style={styles.cardSubText}>Amount Paid: 160 Rs</Text>
          <Text style={styles.cardSubText}>Transaction ID: VADE0B248932</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", paddingHorizontal: 20 },
  backButton: { flexDirection: "row", alignItems: "center", marginTop: 20 },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 10 },
  imageContainer: { alignItems: "center", marginVertical: 20 },
  image: { width: 200, height: 150, resizeMode: "contain" },
  detailsContainer: { backgroundColor: "#fff", padding: 15, borderRadius: 10, elevation: 3 },
  label: { fontSize: 16, fontWeight: "bold" },
  boldText: { fontWeight: "bold" },
  subText: { fontSize: 14, color: "#555", marginTop: 5 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginTop: 15 },
  card: { backgroundColor: "#eee", padding: 15, borderRadius: 8, marginTop: 10 },
  cardText: { fontSize: 16 },
  cardSubText: { fontSize: 14, color: "#555", marginTop: 3 },
  ratingContainer: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  ratingText: { fontSize: 14, fontWeight: "bold" },
});

export default HistoryScreen;
