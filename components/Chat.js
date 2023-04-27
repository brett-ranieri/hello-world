import { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button, TextInput } from "react-native";

const Chat = ({ navigation, route }) => {
	const { name } = route.params;
	const { background } = route.params;

	useEffect(() => {
		navigation.setOptions({ title: name });
	}, [navigation, name]);

	return (
		<View style={[styles.container, { backgroundColor: background }]}>
			<Text>I'm the Chat page!</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-evenly",
		alignItems: "center",
	},
});

export default Chat;
