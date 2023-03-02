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

function JobSelectionScreen({
	callback = (jobSelectionEvent) => {},
	...props
}) {
	const jobSearchAnimConfig = { duration: 1000 };
	const jobSearchInputScale = useSharedValue(0.8);
	const jobSearchInputScaleStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ scale: withSpring(jobSearchInputScale.value, jobSearchAnimConfig) },
			],
		};
	});
	const jobSearchIconPadding = useSharedValue(10);
	const jobSearchIconPaddingStyle = useAnimatedStyle(() => {
		return {
			paddingHorizontal: withSpring(
				jobSearchIconPadding.value,
				jobSearchAnimConfig
			),
		};
	});

	// jobs fetch
	const [allJobs, setAllJobs] = useState({});

	function GenerateCallbackEvent({ message, jobID }) {
		var result = {};
		if (jobID < 0) {
			result = { success: false, content: {} };
		} else {
			result = { success: true, content: allJobs[jobID] };
		}
		return { message, result };
	}

	function GenerateJobArray() {
		var jobs = {};
		for (var i = 7; i < 30; i++) {
			jobs["job" + i] = {
				title: "Job #" + i,
				description: "This is auto generated description for job #" + i,
			};
		}

		setAllJobs({
			job1: {
				title: "FrontEnd Developer",
				description: "React, ReactJS, JSX, TypeScript",
			},
			job2: {
				title: "BackEnd Developer",
				description: "Python",
			},
			job3: {
				title: "",
				description: "this is pretty cool",
			},
			job4: {
				title: "no, this is cooler",
				description: "",
			},
			job5: {
				title: "Long title job is kinda cool right idk bro yes",
				description: "",
			},
			job6: {
				title: "Long title job is kinda cool right idk bro yes",
				description:
					"But I think long description is cooler even tho its supposed to be short..",
			},
			...jobs,
		});
	}

	useEffect(() => {
		GenerateJobArray();
	}, []);

	// child for popup modal
	function JobCards({ ...props }) {
		const JobCardHeight = 100;
		return (
			<ScrollView
				style={styles.jobs}
				snapToAlignment="center"
				snapToInterval={JobCardHeight}
				decelerationRate={0}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}>
				{Object.entries(allJobs).map((jobObj, idx) => {
					const id = jobObj[0];
					const job = jobObj[1];

					return (
						<JobCard
							title={job.title ? job.title : "No title given."}
							shortDescription={
								job.description ? job.description : "No description given."
							}
							onPress={() => {
								callback(
									GenerateCallbackEvent({
										message: "job selected",
										jobID: id,
									})
								);
							}}
							key={idx}
						/>
					);
				})}
			</ScrollView>
		);
	}

	return (
		<View style={[styles.container]}>
			<Animated.View style={[styles.searchContainer, jobSearchInputScaleStyle]}>
				<Animated.View style={[jobSearchIconPaddingStyle]}>
					{getIcon("search-outline", undefined, 20)}
				</Animated.View>
				<TextInput
					style={[styles.inputText]}
					autoFocus={false}
					placeholder="Enter job title..."
					onFocus={() => {
						jobSearchInputScale.value = 1;
						jobSearchIconPadding.value = 25;
					}}
					onBlur={() => {
						jobSearchInputScale.value = 0.8;
						jobSearchIconPadding.value = 12;
					}}
				/>
			</Animated.View>
			<JobCards />
		</View>
	);
}

function JobCard({
	jobObject = {},
	title = "No title given.",
	shortDescription = "No description given.",
	onPress = () => {},
	removerShown = true,
	titleMultiline = false,
	descriptionMultiline = false,
	...props
}) {
	var jobTitle = title;
	var jobDesc = shortDescription;
	if (Object.values(jobObject).length === 2) {
		if (jobTitle) jobTitle = jobObject.title;
		if (jobObject.description) jobDesc = jobObject.description;
	}

	return (
		<TouchableOpacity
			onPress={() => {
				onPress();
			}}>
			<View style={[styles.jobCard, props.style]}>
				<View style={styles.jobCardHeader}>
					<Text style={styles.text} numberOfLines={titleMultiline ? undefined : 1}>
						{jobTitle}
					</Text>
					<TouchableOpacity
						onPress={() => {
							console.log("delete job");
						}}>
						{removerShown && getIcon("trash-outline")}
					</TouchableOpacity>
				</View>
				<Text style={styles.descriptionText} numberOfLines={descriptionMultiline ? undefined : 1}>
					{jobDesc}
				</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 20,
		alignItems: "center",
		width: "100%",
		flex: 1,
	},
	searchContainer: {
		backgroundColor: "#FFFFFF",
		width: "90%",
		borderRadius: 10,
		height: 50,
		borderWidth: 1,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	jobs: {
		margin: 20,
		width: "90%",
	},
	jobCard: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		borderColor: "#000000",
		borderRadius: 20,
		paddingVertical: 10,
		paddingHorizontal: 25,
		margin: 10,
		shadowOpacity: 1,
		shadowOffset: {
			width: 1,
			height: 2,
		},
		elevation: 2,
		height: 110,
	},
	jobCardHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	text: {
		fontFamily: "MaitreeBold",
		fontSize: 20,
		marginBottom: 10,
	},
	inputText: {
		fontFamily: "MaitreeMedium",
		fontSize: 14,
		flex: 1,
		paddingVertical: 10,
		marginRight: 20,
	},
	descriptionText: {
		fontFamily: "Maitree",
		fontSize: 16,
	},
});

export { JobSelectionScreen, JobCard };
