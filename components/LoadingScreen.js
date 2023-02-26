import { View, Text } from "react-native";

function LoadingScreen ( {text, ...props }) {
  return (
    <View
      style={[{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 24,
        height: "100%",
      }, props.style]}>
      <Text style={[{ fontSize: 24 }, props.style]}>{text}</Text>
    </View>
  );
}

export default LoadingScreen;