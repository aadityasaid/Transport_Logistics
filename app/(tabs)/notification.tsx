import { Text, View, StyleSheet} from "react-native";

export default function Notification() {
  return (
    <View
      style={style.container}
    >
      <Text style={style.text}>Notification</Text>
    </View>
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