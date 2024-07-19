import { View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white" }}>Home</Text>
    </View>
  );
}
