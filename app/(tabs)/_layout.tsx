import { Tabs } from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import Feather from "react-native-vector-icons/Feather"; // Import Feather Icons

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: "#000000",
        tabBarActiveTintColor: "#290D85",
        
      }}

    >
    <Tabs.Screen name="home" options={{
        headerTitle:"Home",
        tabBarIcon: ({focused, color}) => (<Ionicons name={focused ? "home-sharp" : "home-outline"}  color={color} size={23}/>),
    }}/>
    
    <Tabs.Screen name="history" options={{
        headerTitle:"History",
        tabBarIcon: ({focused, color}) => (<Ionicons name={focused ? "time-sharp" : "time-outline"}  color={color} size={25}/>),
    }}/>


  <Tabs.Screen name="create" options={{
        headerTitle:"Upload Parcel Details",
        tabBarIcon: ({focused, color}) => (<Ionicons name={focused ? "add-circle-sharp" : "add-circle-outline"}  color={color} size={25}/>),
    }}/>


  <Tabs.Screen name="notification" options={{
        headerTitle:"Notification",
        tabBarIcon: ({focused, color}) => (<Ionicons name={focused ? "notifications-circle-sharp" : "notifications-circle-outline"}  color={color} size={25}/>),
    }}/>


  <Tabs.Screen name="profile" options={{
        headerTitle:"Profile",
        tabBarIcon: ({focused, color}) => (<Ionicons name={focused ? "person-circle-sharp" : "person-circle-outline"}  color={color} size={25}/>),
    }}/> 




    

    </Tabs>
  );
}



