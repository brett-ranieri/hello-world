import React from "react";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const Stack = createNativeStackNavigator();

const App = () => {
	// connect app to Firebase
	const firebaseConfig = {
		apiKey: "AIzaSyBlugMRKwIZljelIvDE8HuXgsaI_IHPxBY",
		authDomain: "hello-world-d0036.firebaseapp.com",
		projectId: "hello-world-d0036",
		storageBucket: "hello-world-d0036.appspot.com",
		messagingSenderId: "424412415357",
		appId: "1:424412415357:web:400cdc551b484185d2f814",
	};

	const app = initializeApp(firebaseConfig);
	// establish reference to Firebase DB
	const db = getFirestore(app);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Start'>
				<Stack.Screen
					name='Start'
					component={Start}
				/>
				<Stack.Screen name='Chat'>
					{(props) => (
						<Chat
							db={db}
							{...props}
						/>
					)}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
