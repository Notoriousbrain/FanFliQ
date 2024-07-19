import { View, Text } from "react-native";

export default function TabTwoScreen() {
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
      <Text style={{ color: "white" }}>Like</Text>
    </View>
  );
}
