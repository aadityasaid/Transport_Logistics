import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

// Import Local Images
const images = [
  require("../../assets/images/box.png"),
  require("../../assets/images/box1.png"),
  require("../../assets/images/box2.png"),
];

const ParcelCard = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % images.length;
      setActiveIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 1500);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate("bidscreen")}>
        {/* Category & Posted Time */}
        <Text style={styles.category}>
          <Text style={styles.bold}>Category:</Text> Plants
        </Text>
        <Text style={styles.posted}>Posted 2 hours ago</Text>

        {/* Image Slider */}
        <FlatList
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <Image source={item} style={styles.image} />}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setActiveIndex(index);
          }}
        />

        {/* Dots Indicator */}
        <View style={styles.dotContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, activeIndex === index ? styles.activeDot : null]}
            />
          ))}
        </View>

        {/* Parcel Details */}
        <Text style={styles.detailsTitle}>Parcel details:</Text>
        <Text style={styles.details}>Dimensions: 30cm x 30cm x 20cm</Text>
        <Text style={styles.details}>Weight: 5Kg</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    marginTop: 20,
    width: width * 0.89,
    alignSelf: "center",
  },
  category: {
    fontSize: 18,
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
    fontSize:18,
  },
  posted: {
    fontSize: 17,
    color: "#777",
    marginBottom: 10,
  },
  image: {
    width: width * 0.9 - 20,
    height: 250,
    borderRadius: 5,
    marginBottom: 10,
    resizeMode: "cover",
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#000",
  },
  detailsTitle: {
    marginTop:20,
    fontWeight: "bold",
    fontSize: 18,
  },
  details: {
    fontSize: 15,
    color: "#333",
  },
});

export default ParcelCard;
