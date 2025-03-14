import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking, Alert } from "react-native";
import { useRouter } from "expo-router";

const UPI_AMOUNT = 1000;
const UPI_ID = "aadityasaid@oksbi";

const UPI_OPTIONS = [
  {
    id: "phonepe",
    name: "PhonePe",
    image: require("../assets/images/phonepe.png"),
    upiLink: `phonepe://upi/pay?pa=${UPI_ID}&pn=Aaditya&mc=1234&tid=987654321&tr=txn123&tn=Payment&am=${UPI_AMOUNT}&cu=INR`,
  },
  {
    id: "gpay",
    name: "GPay",
    image: require("../assets/images/gpay.png"),
    upiLink: `tez://upi/pay?pa=${UPI_ID}&pn=Aaditya&mc=1234&tid=987654321&tr=txn123&tn=Payment&am=${UPI_AMOUNT}&cu=INR`,
  },
  {
    id: "amazonpay",
    name: "Amazon Pay UPI",
    image: require("../assets/images/amazonpay.png"),
    upiLink: `amazonpay://upi/pay?pa=${UPI_ID}&pn=Aaditya&mc=1234&tid=987654321&tr=txn123&tn=Payment&am=${UPI_AMOUNT}&cu=INR`,
  },
];

const PaymentsScreen = () => {
  const router = useRouter();

  // Function to open the selected UPI app
  const handleUPIPayment = (upiLink: string) => {
    Linking.openURL(upiLink).catch(() => {
      Alert.alert("Error", "Could not open the selected UPI app. Make sure it is installed.");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.amount}>Total Amount: ₹{UPI_AMOUNT}</Text>
      <Text style={styles.subHeader}>Pay by UPI</Text>

      <View style={styles.paymentContainer}>
        <View style={styles.upiContainer}>
          {UPI_OPTIONS.map((option) => (
            <TouchableOpacity key={option.id} style={styles.upiOption} onPress={() => handleUPIPayment(option.upiLink)}>
              <Image source={option.image} style={styles.upiIcon} />
              <Text style={styles.upiText}>{option.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity onPress={() => router.push('add-upi-id')} style={styles.addUPIButton}>
          <Text style={styles.plusIcon}>+</Text>
          <Text style={styles.addUPIText}>Add new UPI ID</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5FA", padding: 20 },
  amount: { fontSize: 16, color: "gray", marginBottom: 20 },
  subHeader: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  paymentContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  upiContainer: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginBottom: 10 },
  upiOption: { alignItems: "center" },
  upiIcon: { width: 50, height: 50, marginBottom: 5 },
  upiText: { fontSize: 14, color: "black" },
  addUPIButton: { flexDirection: "row", alignItems: "center", marginTop: 15 },
  plusIcon: { fontSize: 24, color: "#666", marginRight: 8, marginTop: 20, marginLeft: 15 },
  addUPIText: { marginTop: 20, fontSize: 16, color: "#666" },
});

export default PaymentsScreen;
