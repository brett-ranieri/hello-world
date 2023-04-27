import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

const Chat = ({ navigation, route }) => {
	const { name } = route.params;
	const { background } = route.params;

	useEffect(() => {
		navigation.setOptions({ title: name }); //sets Username to title on use of component
	}, [navigation, name]);

	return (
		<View style={[styles.container, { backgroundColor: background }]}>
			<Text
				style={{ color: background == "#090C08" || background == "#474056" ? "#ffffff" : "black" }}
			>
				I'm the Chat page!
			</Text>
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
