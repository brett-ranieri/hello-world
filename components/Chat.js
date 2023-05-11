import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, getDocs, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";

const Chat = ({ navigation, route, db, isConnected, storage }) => {
	const { name } = route.params;
	const { background } = route.params;
	const { userID } = route.params;
	const [messages, setMessages] = useState([]);

	let unsubMessages;

	useEffect(() => {
		navigation.setOptions({ title: name });

		if (isConnected === true) {
			if (unsubMessages) unsubMessages();
			unsubMessages = null;
			const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
			unsubMessages = onSnapshot(q, (docs) => {
				let newMessages = [];
				docs.forEach((doc) => {
					newMessages.push({
						id: doc.id,
						...doc.data(),
						createdAt: new Date(doc.data().createdAt.toMillis()),
					});
				});
				cacheMessages(newMessages);
				setMessages(newMessages);
			});
		} else {
			loadCachedMessages();
		}

		return () => {
			if (unsubMessages) unsubMessages();
		};
	}, [isConnected]);

	const cacheMessages = async (messagesToCache) => {
		try {
			await AsyncStorage.setItem("message_list", JSON.stringify(messagesToCache));
		} catch (error) {
			console.log(error.message);
		}
	};

	const loadCachedMessages = async () => {
		const cachedMessages = (await AsyncStorage.getItem("message_list")) || [];
		setMessages(JSON.parse(cachedMessages));
	};

	const onSend = (newMessages) => {
		const newMessageRef = addDoc(collection(db, "messages"), newMessages[0]);
	};

	const renderBubble = (props) => {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: "#9ca0a8",
					},
					left: {
						backgroundColor: "#F3F4F6",
					},
				}}
				textStyle={{
					right: {
						color: "#F3F4F6",
					},
				}}
			/>
		);
	};

	const renderInputToolbar = (props) => {
		if (isConnected === true) {
			return (
				<InputToolbar
					{...props}
					containerStyle={styles.inputToolbarStyle}
				/>
			);
		} else return null;
	};

	const renderCustomActions = (props) => {
		return (
			<CustomActions
				storage={storage}
				userID={userID}
				{...props}
			/>
		);
	};

	const renderCustomView = (props) => {
		const { currentMessage } = props;
		if (currentMessage.location) {
			return (
				<View style={styles.mapView}>
					<MapView
						style={{
							width: 150,
							height: 100,
							borderRadius: 13,
							margin: 3,
						}}
						region={{
							latitude: currentMessage.location.latitude,
							longitude: currentMessage.location.longitude,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}
					/>
				</View>
			);
		}
		return null;
	};

	return (
		<SafeAreaView
			style={[
				styles.container,
				{ backgroundColor: background },
				{ color: background == "#090C08" || background == "#474056" ? "#ffffff" : "black" },
			]}
		>
			<GiftedChat
				messages={messages}
				onSend={(messages) => onSend(messages)}
				user={{
					_id: userID,
					name: name,
				}}
				renderBubble={renderBubble}
				renderInputToolbar={renderInputToolbar}
				renderActions={renderCustomActions}
				renderCustomView={renderCustomView}
			/>
			{Platform.OS === "android" ? <KeyboardAvoidingView behavior='height' /> : null}
			{Platform.OS === "ios" ? <KeyboardAvoidingView behavior='height' /> : null}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
	},
	inputToolbarStyle: {
		marginLeft: 15,
		marginRight: 15,
		marginTop: 10,
		borderRadius: 13,
	},
	mapView: {
		borderRadius: 20,
		overflow: "hidden",
	},
});

export default Chat;
