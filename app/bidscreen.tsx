import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const bids = [
  { id: "1", name: "Satish More", amount: "160 Rs", time: "12:05 PM", rating: 4.0, reviews: 20, phone: "9302535457" },
  { id: "2", name: "Satish More", amount: "165 Rs", time: "12:10 PM", rating: 4.2, reviews: 15, phone: "9302535458" },
  { id: "3", name: "Ankit Sharma", amount: "170 Rs", time: "12:15 PM", rating: 4.5, reviews: 25, phone: "9302535459" },
];

const images = [
  require("../assets/images/box.png"),
  require("../assets/images/box1.png"),
  require("../assets/images/box2.png"),
];

const dialNumber = (number) => {
  Linking.openURL(`tel:${number}`);
};

const BidsScreen = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedBid, setSelectedBid] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleBidPress = (bid) => {
    setSelectedBid(selectedBid?.id === bid.id ? null : bid);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <FlatList
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image source={item} style={styles.image} />
            </View>
          )}
          onMomentumScrollEnd={(event) => {
            const index = Math.floor(event.nativeEvent.contentOffset.x / width);
            setActiveIndex(index);
          }}
        />

        <Text style={styles.bidsTitle}>Existing Bids</Text>

        <FlatList
          data={bids}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleBidPress(item)} style={selectedBid?.id === item.id ? styles.expandedBidCard : styles.bidCard}>
              <Text style={styles.bidderName}>Bidder: {item.name}</Text>
              <Text style={styles.bidDetails}>Amount: {item.amount}</Text>
              <Text style={styles.bidDetails}>Time: {item.time}</Text>

              {selectedBid?.id === item.id && (
                <>
                  <Text style={styles.bidDetails}>Rating: {item.rating} ⭐</Text>
                  <Text style={styles.bidDetails}>Reviews: {item.reviews}</Text>
                  <TouchableOpacity style={styles.callContainer} onPress={() => dialNumber(item.phone)}>
                    <MaterialIcons name="call" size={24} color="#0000FF" />
                    <Text style={styles.bidDetailsPhNo}>Ph No: {item.phone}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.payButton} onPress={() => router.push('/payment')}>
                    <Text style={styles.payButtonText}>Accept & Pay</Text>
                  </TouchableOpacity>
                </>
              )}
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    marginBottom: 10,
  },
  imageContainer: {
    width: width - 50,
    height: 250,
    borderRadius: 5,
    overflow: "hidden",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    alignSelf: "center",
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
    backgroundColor: "#D3D3D3",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
  },
  bidderName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  bidDetails: {
    fontSize: 16,
    color: "#333",
  },
  bidDetailsPhNo: {
    fontSize: 16,
    color: "#0000FF",
    marginLeft: 10,
  },
  callContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  payButton: {
    alignSelf: "center",
    width: "65%",
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
