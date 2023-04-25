import { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button, TextInput } from "react-native";

const Chat = ({ navigation, route }) => {
	const { name } = route.params;

	// let checkName;
	// checkName = () => {
	// 	console.log("Username ", name);
	// };

	useEffect(() => {
		navigation.setOptions({ title: name });
	}, []);

	return (
		<View style={styles.container}>
			<Text>I'm the Chat page!</Text>
			{/* <Button
				title='Check Username'
				onPress={() => checkName()}
			/> */}
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
});

export default Chat;
