import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, getDocs, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";

const Chat = ({ navigation, route, db, isConnected }) => {
	const { name } = route.params;
	const { background } = route.params;
	const { userID } = route.params;
	const [messages, setMessages] = useState([]);

	let unsubMessages;

	useEffect(() => {
		console.log("Chat connection ", isConnected);
		navigation.setOptions({ title: name }); //sets Username to title on use of component
		// queries db to load all previous messages

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
						createdAt: new Date(doc.data().createdAt.toMillis()), //updates date to proper format for GiftedChat
					});
				});
				cacheMessages(newMessages);
				setMessages(newMessages);
			});
		} else {
			loadCachedMessages();
			console.log("these messages are cached!");
		}
		//cleans up code
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
		console.log("loaded to cached messages...");
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
			return <InputToolbar {...props} />;
		} else return null;
	};

	const renderCustomActions = (props) => {
		return <CustomActions {...props} />;
	};

	return (
		<View
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
			/>
			{Platform.OS === "android" ? <KeyboardAvoidingView behavior='height' /> : null}
			{Platform.OS === "ios" ? <KeyboardAvoidingView behavior='height' /> : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default Chat;
