import { Stack } from "expo-router";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true);

export default function RootLayout() {
  return (
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
      headerTitle:"Sign Up Now",
    }}/>


   

    </Stack>
  );
}
