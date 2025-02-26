// import React, { useEffect } from 'react';
// import { Text, View, StyleSheet } from "react-native";
// import { Stack, useRouter } from 'expo-router';
// import LottieView from 'lottie-react-native';

// export default function Loder() {
//   const router = useRouter();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       router.push('/home');
//     }, 1540);
    
//     // Cleanup the timer on component unmount
//     return () => clearTimeout(timer);
//   }, [router]);

//   return (
//     <>
//       <Stack.Screen 
//         options={{
//           headerShown: false
//         }}
//       />
      
//       <View style={style.container}>
//         <View style={style.welcome}>
          
//           <LottieView style={{ flex: 1 }} source={require('../assets/animation/belt-loder.json')} autoPlay loop />
//         </View>
//         {/* <Text style={style.text}>WELCOME </Text> */}
//       </View>
//     </>
//   );
// }

// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   text: {
//     fontFamily: "Poppins",
//     fontSize: 30,
//     color: '#290D85'
//   },
//   welcome: {
//     height: 350,
//     aspectRatio: 1,
    
//   }
// });



