import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button, TextInput } from "react-native";

const Start = ({ navigation }) => {
	const [name, setName] = useState("");
	const [background, setBackground] = useState("#ffffff");
	const [buttonIndex, setButtonIndex] = useState();

	function changeBackground(color) {
		setBackground(color);
	}

	function buttonBorder(index) {
		setButtonIndex(index);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.appTitle}>hello-world</Text>
			<View style={styles.inputContainer}>
				<TextInput
					style={[styles.text, styles.textInput]}
					placeholder='Your Name'
					value={name}
					onChangeText={setName}
				></TextInput>
				<View style={styles.backgroundContainer}>
					<Text style={styles.text}>Choose Background Color:</Text>
					<View style={styles.optionsContainer}>
						<TouchableOpacity
							onPress={() => {
								changeBackground("#090C08");
								buttonBorder(0);
							}}
							style={[
								styles.backgroundOptions,
								{ backgroundColor: "#090C08" },
								{ borderColor: buttonIndex === 0 ? "#757083" : "#ffffff" },
							]}
						></TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								changeBackground("#474056");
								buttonBorder(1);
							}}
							style={[
								styles.backgroundOptions,
								{ backgroundColor: "#474056" },
								{ borderColor: buttonIndex === 1 ? "#757083" : "#ffffff" },
							]}
						></TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								changeBackground("#8A95A5");
								buttonBorder(2);
							}}
							style={[
								styles.backgroundOptions,
								{ backgroundColor: "#8A95A5" },
								{ borderColor: buttonIndex === 2 ? "#757083" : "#ffffff" },
							]}
						></TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								changeBackground("#B9C6AE");
								buttonBorder(3);
							}}
							style={[
								styles.backgroundOptions,
								{ backgroundColor: "#B9C6AE" },
								{ borderColor: buttonIndex === 3 ? "#757083" : "#ffffff" },
							]}
						></TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity
					style={styles.chatButton}
					onPress={() => navigation.navigate("Chat", { name: name, background: background })}
				>
					Start Chating
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-evenly",
		alignItems: "center",
		alignContent: "flex-end",
		backgroundColor: "#000000",
	},
	appTitle: {
		flex: 1,
		width: "100%",
		height: "100%",
		fontSize: 45,
		fontWeight: "600",
		color: "#ffffff",
		textAlign: "center",
		paddingTop: "10%",
	},
	inputContainer: {
		width: "88%",
		height: "44%",
		justifyContent: "space-around",
		alignItems: "center",
		backgroundColor: "#ffffff",
		marginBottom: "6%",
	},
	text: {
		fontSize: 16,
		fontWeight: "300",
		color: "#757083",
	},
	textInput: {
		height: 45,
		width: "88%",
		opacity: "50%",
		borderWidth: 1,
		paddingLeft: 12,
	},
	backgroundContainer: {
		opacity: "100%",
		width: "88%",
	},
	optionsContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
	},
	backgroundOptions: {
		height: 40,
		width: 40,
		borderRadius: 20,
		margin: 10,
		borderWidth: 3,
		padding: 3,
	},
	chatButton: {
		height: 45,
		width: "88%",
		fontSize: 16,
		fontWeight: "600",
		color: "#ffffff",
		justifyContent: "center",
		textAlign: "center",
		backgroundColor: "#757083",
	},
});

export default Start;
