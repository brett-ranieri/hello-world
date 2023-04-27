import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground } from "react-native";

const Start = ({ navigation }) => {
	const [name, setName] = useState("");
	const [background, setBackground] = useState("#ffffff");
	const [buttonIndex, setButtonIndex] = useState();

	// sets background color to pass to Chat screen, index determines border on choosen opacity
	function changeBackground(color, index) {
		setBackground(color);
		setButtonIndex(index);
	}

	return (
		<View style={styles.container}>
			<ImageBackground
				style={styles.imgBackground}
				source={require("../assets/Background_Image.png")}
				resizeMode='cover'
			>
				<Text style={styles.appTitle}>hello-world</Text>
				<View style={styles.inputContainer}>
					<TextInput
						style={[styles.text, styles.textInput]}
						placeholder='Your Name'
						value={name}
						onChangeText={setName} //sets Username to pass to Chat screen
					></TextInput>
					<View style={styles.backgroundContainer}>
						<Text style={styles.text}>Choose Background Color:</Text>
						<View style={styles.optionsContainer}>
							<TouchableOpacity
								onPress={() => changeBackground("#090C08", 0)}
								style={[
									styles.backgroundOptions,
									{ backgroundColor: "#090C08" },
									{ borderColor: buttonIndex === 0 ? "#757083" : "#ffffff" },
								]}
							></TouchableOpacity>
							<TouchableOpacity
								onPress={() => changeBackground("#474056", 1)}
								style={[
									styles.backgroundOptions,
									{ backgroundColor: "#474056" },
									{ borderColor: buttonIndex === 1 ? "#757083" : "#ffffff" },
								]}
							></TouchableOpacity>
							<TouchableOpacity
								onPress={() => changeBackground("#8A95A5", 2)}
								style={[
									styles.backgroundOptions,
									{ backgroundColor: "#8A95A5" },
									{ borderColor: buttonIndex === 2 ? "#757083" : "#ffffff" },
								]}
							></TouchableOpacity>
							<TouchableOpacity
								onPress={() => changeBackground("#B9C6AE", 3)}
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
						<Text style={styles.chatButtonText}>Start Chatting</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
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
	imgBackground: {
		width: "100%",
		height: "100%",
		flex: 1,
		alignItems: "center",
	},
	appTitle: {
		flex: 1,
		width: "100%",
		height: "100%",
		fontSize: 45,
		fontWeight: "600",
		color: "#ffffff",
		textAlign: "center",
		paddingTop: "20%",
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
		// opacity: "50%",
		borderWidth: 1,
		paddingLeft: 12,
	},
	backgroundContainer: {
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
		justifyContent: "center",
		alignContent: "center",
		backgroundColor: "#757083",
	},
	chatButtonText: {
		color: "#ffffff",
		alignSelf: "center",
	},
});

export default Start;
