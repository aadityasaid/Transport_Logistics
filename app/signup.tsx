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
} from "react-native";
import { Link, useRouter } from 'expo-router';

interface CountryCode {
  code: string;
  country: string;
}

// Country codes data
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

const SignUpScreen = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [selectedCountry, setSelectedCountry] = useState(() => {
    const india = countryCodes.find(c => c.country === 'India');
    return india || countryCodes[0];
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const validateName = (name: string) => {
    return name.trim().length >= 2;
  };

  const handleNameChange = (text: string) => {
    setName(text);
    if (!text.trim()) {
      setErrors(prev => ({ ...prev, name: "Name is required" }));
    } else if (!validateName(text)) {
      setErrors(prev => ({ ...prev, name: "Name should be at least 2 characters" }));
    } else {
      setErrors(prev => ({ ...prev, name: "" }));
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (!text.trim()) {
      setErrors(prev => ({ ...prev, email: "Email is required" }));
    } else if (!validateEmail(text)) {
      setErrors(prev => ({ ...prev, email: "Please enter a valid email" }));
    } else {
      setErrors(prev => ({ ...prev, email: "" }));
    }
  };

  const handlePhoneNumberChange = (text: string) => {
    const formattedNumber = text.replace(/[^0-9]/g, '');
    setPhoneNumber(formattedNumber);
    
    if (formattedNumber.length === 0) {
      setErrors(prev => ({ ...prev, phone: "Mobile number is required" }));
    } else if (formattedNumber.length !== 10) {
      setErrors(prev => ({ ...prev, phone: "Mobile number must be 10 digits" }));
    } else if (!validatePhoneNumber(formattedNumber)) {
      setErrors(prev => ({ ...prev, phone: "Please enter a valid mobile number" }));
    } else {
      setErrors(prev => ({ ...prev, phone: "" }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {
      name: !name.trim() ? "Name is required" : !validateName(name) ? "Name should be at least 2 characters" : "",
      email: !email.trim() ? "Email is required" : !validateEmail(email) ? "Please enter a valid email" : "",
      phone: !phoneNumber ? "Mobile number is required" : !validatePhoneNumber(phoneNumber) ? "Please enter a valid mobile number" : ""
    };
    
    setErrors(newErrors);

    if (Object.values(newErrors).every(error => error === "")) {
      router.push('/otp');
    }
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
        <Image source={require('../assets/images/tw-logo.png')} style={styles.logo}/>
        <View style={styles.formContainer}>
          <TextInput
            style={[styles.input, errors.name ? styles.inputError : null]}
            placeholder="Name"
            value={name}
            onChangeText={handleNameChange}
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

          <TextInput
            style={[styles.input, errors.email ? styles.inputError : null]}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={handleEmailChange}
            autoCapitalize="none"
          />
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

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
              style={styles.phoneInput}
              placeholder="Enter mobile number"
              keyboardType="number-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
            />
          </View>
          {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

          <TouchableOpacity 
            style={[
              styles.loginButton,
              (!validateName(name) || !validateEmail(email) || !validatePhoneNumber(phoneNumber)) && 
              styles.disabledButton
            ]} 
            onPress={handleSubmit}
            disabled={!validateName(name) || !validateEmail(email) || !validatePhoneNumber(phoneNumber)}
          >
            <Text style={styles.loginText}>Get OTP</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sign_up_text_button}>Already have an account?</Text>
        <Link href="/" style={styles.button}>
          Login
        </Link>

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

// Styles remain the same as in the original code
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop:10,
    marginLeft:30,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "85%",
    paddingVertical: 5,
  },
  countryCode: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  phoneInput: {
    fontSize: 18,
    flex: 1,
    color: "#333",
  },
  loginButton: {
    marginTop: 30,
    backgroundColor: "#142863",
    paddingVertical: 15,
    width: "70%",
    alignItems: "center",
    borderRadius: 30,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",

  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
    resizeMode: 'contain',
  },
  
  sign_up_text_button: {
    marginTop: 'auto',
    marginBottom: 5,
    fontSize: 17,
    color: '#808080',
  },
  button: {
    fontSize: 17,
    color: '#0000FF',
    marginBottom: 30,
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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginBottom: 10,
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
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputError: {
    borderColor: 'red',
  },
  disabledButton: {
    backgroundColor: '#8896c7',
  },
});

export default SignUpScreen;