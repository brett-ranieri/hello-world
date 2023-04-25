import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button, TextInput } from "react-native";

const Start = ({ navigation }) => {
	const [name, setName] = useState("");

	// let checkName;
	// checkName = () => {
	// 	console.log("Username ", name);
	// };

	return (
		<View style={styles.container}>
			<Text>hello-world</Text>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.textInput}
					placeholder='Choose your Username'
					value={name}
					onChangeText={setName}
				></TextInput>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate("Chat", { name: name })}
				>
					Start Chatting
				</TouchableOpacity>
				{/* <Button
					title='Check Username'
					onPress={() => checkName()}
				/> */}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-evenly",
		alignItems: "center",
		// alignContent: "space-evenly",
	},
	inputContainer: {
		width: "88%",
		height: "44%",
		// flex: 1,
		alignSelf: "flex-end",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "blue",
	},
	textInput: {
		width: "88%",
		borderWidth: 1,
		height: 30,
		padding: 10,
	},
	button: {
		height: 30,
		width: 100,
		justifyContent: "center",
		textAlign: "center",
		backgroundColor: "white",
		borderRadius: 3,
	},
});

export default Start;
