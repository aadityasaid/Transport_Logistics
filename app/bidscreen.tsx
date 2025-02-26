import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

const { width } = Dimensions.get("window");

// Dummy Bidding Data
const bids = [
  { id: "1", name: "Satish More", amount: "160 Rs", time: "12:05 PM", rating: 4.0, reviews: 20, phone: "9302535457" },
  { id: "2", name: "Satish More", amount: "160 Rs", time: "12:05 PM", rating: 4.0, reviews: 20, phone: "9302535457" },
  { id: "3", name: "Satish More", amount: "160 Rs", time: "12:05 PM", rating: 4.0, reviews: 20, phone: "9302535457" },
];

// Local images for the slider
const images = [
  require("../assets/images/box.png"),
  require("../assets/images/favicon.png"),
  require("../assets/images/box.png"),
];

const BidsScreen = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedBid, setSelectedBid] = useState(null); // Track selected bid

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500); // Change image every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      

      {/* Parcel Card */}
      <View style={styles.card}>
        {/* Image Slider */}
        <View style={styles.imageContainer}>
          <Image source={images[activeIndex]} style={styles.image} />
        </View>

        {/* Dots Indicator */}
        <View style={styles.dotContainer}>
          {images.map((_, index) => (
            <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
          ))}
        </View>

        <Text style={styles.category}>
          <Text style={styles.bold}>Category:</Text> Electronics
        </Text>
        <Text style={styles.posted}>Posted 2 hours ago</Text>

        <Text style={styles.detailsTitle}>Parcel details:</Text>
        <Text style={styles.details}>Dimensions: 30cm x 30cm x 20cm</Text>
        <Text style={styles.details}>Weight: 5Kg</Text>

        {/* Bidding Section */}
        <Text style={styles.bidsTitle}>Existing Bids</Text>

        {selectedBid ? (
          // Expanded Bid Card
          <View style={styles.expandedBidCard}>
            <View style={styles.bidHeader}>
              <FontAwesome name="user" size={16} color="black" />
              <Text style={styles.bidderName}>Bidder: {selectedBid.name}</Text>
              <View style={styles.rating}>
                <FontAwesome name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{selectedBid.rating} ({selectedBid.reviews})</Text>
              </View>
            </View>
            <Text style={styles.bidDetails}>Time: {selectedBid.time}</Text>
            <Text style={styles.bidDetails}>Contact Details: </Text>
            <Text style={styles.bidDetails}>Ph No: {selectedBid.phone}</Text>
            <TouchableOpacity style={styles.callIcon}>
              <MaterialIcons name="call" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.bidDetails}>Amount: {selectedBid.amount}</Text>

            {/* Accept & Pay Button */}
            <TouchableOpacity style={styles.payButton} onPress={() => console.log("Accept & Pay")}>
              <Text style={styles.payButtonText}>Accept & Pay</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // List of Bids
          <FlatList
            data={bids}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedBid(item)} style={styles.bidCard}>
                <View style={styles.bidHeader}>
                  <FontAwesome name="user" size={16} color="black" />
                  <Text style={styles.bidderName}>Bidder: {item.name}</Text>
                  <View style={styles.rating}>
                    <FontAwesome name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.rating} ({item.reviews})</Text>
                  </View>
                </View>
                <Text style={styles.bidDetails}>Time: {item.time}</Text>
                <Text style={styles.bidDetails}>Amount: {item.amount}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 10,
    zIndex: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 10,
  },
  imageContainer: {
    width: width - 30,
    height: 200,
    borderRadius: 5,
    overflow: "hidden",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#000",
  },
  category: {
    fontSize: 16,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  bidsTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 15,
  },
  bidCard: {
    backgroundColor: "#EAEAEA",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  expandedBidCard: {
    backgroundColor: "#EAEAEA",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
  },
  bidHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bidderName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 5,
    fontWeight: "bold",
  },
  bidDetails: {
    fontSize: 14,
    color: "#333",
  },
  callIcon: {
    alignSelf: "flex-start",
    marginVertical: 5,
  },
  payButton: {
    alignSelf: "center",
    width:"65%",
    backgroundColor: "#213A83",
    padding: 12,
    borderRadius: 30,
    marginTop: 10,
    alignItems: "center",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BidsScreen;
