import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Start'>
				<Stack.Screen
					name='Start'
					component={Start}
				/>
				<Stack.Screen
					name='Chat'
					component={Chat}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
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
	},
});

export default App;
