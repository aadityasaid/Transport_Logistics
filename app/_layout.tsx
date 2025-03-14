import React from 'react';
import { Stack } from "expo-router";
import { LogBox } from "react-native";
import { StatusBar } from 'expo-status-bar';

LogBox.ignoreAllLogs(true);

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
            
            <Stack>
            <Stack.Screen name="(tabs)" options={{
              // headerTitle: "Login Page",
              headerShown: false
            }}/>
            
            

            <Stack.Screen name="+not-found" options={{
              headerShown: false,
            }}/>

            <Stack.Screen name="index" options={{
              headerShown:false,
            }}/>

            <Stack.Screen name="signup" options={{
              // headerTitle:"Sign Up Now",
              headerShown:false,

            }}/>


            <Stack.Screen name="bidscreen" options={{
              headerTitle:"Bid ",
            }}/>


            <Stack.Screen name="payment" options={{
              headerTitle:"Payment ",
            }}/>


            <Stack.Screen name="add-upi-id" options={{
              headerTitle:"Add new UPI ID ",
            }}/>


            <Stack.Screen name="edit-profile" options={{
              headerTitle:"Edit Profile ",
            }}/>

            <Stack.Screen name="setting" options={{
              headerTitle:"Setting ",
            }}/>


            

            </Stack>
          
    </>
  );
}
