import React, { useState, useMemo } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  FlatList,
  Pressable,
} from "react-native";
import { Link, useRouter } from 'expo-router';

interface CountryCode {
  code: string;
  country: string;
}

const countryCodes: CountryCode[] = [
  { code: '+91', country: 'India' },
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'Australia' },
  { code: '+86', country: 'China' },
  { code: '+81', country: 'Japan' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+7', country: 'Russia' },
  { code: '+65', country: 'Singapore' },
  { code: '+971', country: 'UAE' },
  { code: '+92', country: 'Pakistan' },
  { code: '+880', country: 'Bangladesh' },
  { code: '+94', country: 'Sri Lanka' },
  { code: '+977', country: 'Nepal' },
].sort((a, b) => a.country.localeCompare(b.country));

const LoginScreen = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCountry, setSelectedCountry] = useState(() => {
    const india = countryCodes.find(c => c.country === 'India');
    return india || countryCodes[0];
  });

  // Filter countries based on search query
  const filteredCountries = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return countryCodes.filter(
      country => 
        country.country.toLowerCase().includes(query) ||
        country.code.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const validatePhoneNumber = (number: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number);
  };

  const handlePhoneNumberChange = (text: string) => {
    const formattedNumber = text.replace(/[^0-9]/g, '');
    setPhoneNumber(formattedNumber);
    
    if (formattedNumber.length === 0) {
      setError("Mobile number is required");
    } else if (formattedNumber.length !== 10) {
      setError("Mobile number must be 10 digits");
    } else if (!validatePhoneNumber(formattedNumber)) {
      setError("Please enter a valid mobile number");
    } else {
      setError("");
    }
  };

  const handleLogin = () => {
    if (!phoneNumber) {
      setError("Mobile number is required");
      return;
    }
    
    if (!validatePhoneNumber(phoneNumber)) {
      setError("Please enter a valid mobile number");
      return;
    }

    router.push({
      pathname: '/otp',
      params: { 
        phoneNumber: phoneNumber,
        countryCode: selectedCountry.code 
      }
    });
  };

  const renderCountryItem = ({ item }: { item: CountryCode }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => {
        setSelectedCountry(item);
        setModalVisible(false);
      }}
    >
      <Text style={styles.countryText}>{item.country}</Text>
      <Text style={styles.countryCode}>{item.code}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image source={require('../assets/images/tw-logo.png')} style={styles.logo}/>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.inputContainer}>
            <TouchableOpacity 
              style={styles.countryCodeSelector}
              onPress={() => {
                setModalVisible(true);
                setSearchQuery("");
              }}
            >
              <Text style={styles.countryCode}>{selectedCountry.code}</Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Enter mobile number"
              keyboardType="number-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
            />
          </View>
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity 
            style={[styles.loginButton, !validatePhoneNumber(phoneNumber) && styles.disabledButton]} 
            onPress={handleLogin}
            disabled={!validatePhoneNumber(phoneNumber)}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <Link href="/home" style={styles.Link}>
            home
          </Link>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <Link href="/signup" style={styles.signUpLink}>
            Sign up now
          </Link>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Country</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                  <Text style={styles.searchIcon}>🔍</Text>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search country or code..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoCapitalize="none"
                    clearButtonMode="while-editing"
                  />
                </View>
              </View>

              <FlatList
                data={filteredCountries}
                renderItem={renderCountryItem}
                keyExtractor={item => item.code}
                style={styles.countryList}
                keyboardShouldPersistTaps="handled"
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

// Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    width: '100%',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop:50,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 20,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "90%",
    paddingVertical: 5,
  },
  countryCodeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    marginRight: 10,
  },
  dropdownArrow: {
    marginLeft: 5,
    fontSize: 12,
    color: '#666',
  },
  input: {
    fontSize: 18,
    flex: 1,
    color: "#333",
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: "#142863",
    paddingVertical: 15,
    width: "80%",
    alignItems: "center",
    borderRadius: 30,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerContainer: {
    marginTop: 'auto',
    marginBottom: 30,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 17,
    color: '#808080',
    marginBottom: 5,
  },
  signUpLink: {
    fontSize: 17,
    color: '#0000FF',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#8896c7',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 20,
    color: '#666',
    padding: 5,
  },
  countryList: {
    maxHeight: '80%',
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  countryText: {
    fontSize: 16,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: "bold",
  },
  searchContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  noResults: {
    padding: 20,
    textAlign: 'center',
    color: '#666',
  },
  Link: {
    fontSize:20,
    padding: 10,
    textAlign: 'center',
    fontWeight:"bold",
    color: 'white',
    backgroundColor:"purple",
    borderRadius:20,
    marginTop:100,
  },

});

export default LoginScreen;