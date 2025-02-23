import React from 'react';
import { Text, View, StyleSheet} from "react-native";
import { Stack } from 'expo-router';

export default function HomePage() {
  return (
    <>
      <Stack.Screen 
        options={{
            headerTitle: "Home",
          headerLeft: () => null
        }}
      />
      
      <View style={style.container}>
        <Text style={style.text}>Home page</Text>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    fontFamily:"Poppins",
    fontSize: 30,
    color: '#290D85'
  }
});