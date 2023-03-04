import {
	Dimensions,
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableOpacity,
	Image,
	TouchableWithoutFeedback,
	Button,
	Modal,
} from "react-native";
import { useEffect, useState } from "react";
import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
	Easing,
	withRepeat,
	withSpring,
	interpolate,
	withSequence,
	EasingNode,
	cancelAnimation,
} from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import { getIcon } from "../utils/Utils";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "../App";

function JobCreateForm( {...props} ) {
  return (
    <View style={styles.container}>
      <Text style={{}}>Job create form</Text>
      <View style={styles.inputContainer}>
        <Text style={{marginLeft: 30,}}>Job title:</Text>
        <TextInput style={styles.input} placeholder="Job title"></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    margin: 20,
    padding: 15,
    paddingLeft: 30,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    fontFamily: "Maitree",
  },
});

export {
  JobCreateForm,
}