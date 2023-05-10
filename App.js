import React from "react";
import Start from "./components/Start";
import Chat from "./components/Chat";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { getFirestore, enableNetwork, disableNetwork } from "firebase/firestore";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { Alert } from "react-native";
import { getStorage } from "firebase/storage";

const Stack = createNativeStackNavigator();

const App = () => {
	const connectionStatus = useNetInfo();
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
	// establish reference to Firebase Storage
	const storage = getStorage(app);

	useEffect(() => {
		if (connectionStatus.isConnected === false) {
			Alert.alert("Connection lost!");
			console.log("App - connection lost", connectionStatus.isConnected);
			disableNetwork(db);
		} else if (connectionStatus.isConnected === true) {
			console.log("App - connection ", connectionStatus.isConnected);
			enableNetwork(db);
		}
	}, [connectionStatus.isConnected]);

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
							storage={storage}
							isConnected={connectionStatus.isConnected}
							{...props}
						/>
					)}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
