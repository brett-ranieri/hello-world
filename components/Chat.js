import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = ({ navigation, route }) => {
	const { name } = route.params;
	const { background } = route.params;
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		navigation.setOptions({ title: name }); //sets Username to title on use of component
		setMessages([
			{
				_id: 1,
				text: "Hello developer",
				createdAt: new Date(),
				user: {
					_id: 2,
					name: "React Native",
					avatar: "https://placeimg.com/140/140/any",
				},
			},
			{
				_id: 2,
				text: name + " has entered the chat",
				createdAt: new Date(),
				system: true,
			},
		]);
	}, [navigation, name]);

	const onSend = (newMessages) => {
		setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
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
					_id: 1,
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
