import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { collection, getDocs, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const Chat = ({ navigation, route, db }) => {
	const { name } = route.params;
	const { background } = route.params;
	const { userID } = route.params;
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		navigation.setOptions({ title: name }); //sets Username to title on use of component
		// queries db to load all previous messages
		const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
		const unsubMessages = onSnapshot(q, (docs) => {
			let newMessages = [];
			docs.forEach((doc) => {
				newMessages.push({
					id: doc.id,
					...doc.data(),
					createdAt: new Date(doc.data().createdAt.toMillis()), //updates date to proper format for GiftedChat
				});
			});
			setMessages(newMessages);
		});
		//cleans up code
		return () => {
			if (unsubMessages) unsubMessages();
		};
	}, []);

	const onSend = (newMessages) => {
		const newMessageRef = addDoc(collection(db, "messages"), newMessages[0]);
	};

	const addShoppingList = async (newList) => {
		const newListRef = await addDoc(collection(db, "shoppinglists"), newList);
		if (newListRef.id) {
			// setLists([newList, ...lists]); //calling this here ensures a list reload via useEffect as you are updating state
			setListName("");
			setItem1("");
			setItem2("");
			Alert.alert(`The list "${listName}" has been added.`);
		} else {
			Alert.alert("Unable to add. Please try later");
		}
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
