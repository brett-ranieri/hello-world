import { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ImageBackground,
	KeyboardAvoidingView,
	Platform,
	Alert,
} from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
	const actionSheet = useActionSheet();

	const onActionPress = () => {
		const options = ["Choose From Library", "Take Picture", "Send Location", "Cancel"];
		const cancelButtonIndex = options.length - 1;
		actionSheet.showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex,
			},
			async (buttonIndex) => {
				switch (buttonIndex) {
					case 0:
						console.log("user wants to pick an image");
						pickImage();
						return;
					case 1:
						console.log("user wants to take a photo");
						takePhoto();
						return;
					case 2:
						console.log("user wants to get their location");
						getLocation();
					default:
				}
			}
		);
	};

	const generateReference = (uri) => {
		const timeStamp = new Date().getTime();
		const imageName = uri.split("/")[uri.split("/").length - 1];
		return `${userID}-${timeStamp}-${imageName}`;
	};

	//uploads image to storage and sends image as message
	const uploadAndSendMessage = async (imageURI) => {
		const uniqueRefString = generateReference(imageURI);
		const response = await fetch(imageURI);
		const blob = await response.blob(); //need to turn image into a blob to store on firebase
		const newUploadRef = ref(storage, uniqueRefString);
		uploadBytes(newUploadRef, blob).then(async (snapshot) => {
			console.log("File has been uploaded successfully");
			const imageURL = await getDownloadURL(snapshot.ref);
			onSend({ image: imageURL });
		});
	};
	//picks image from library of user device
	const pickImage = async () => {
		let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
		try {
			if (permissions?.granted) {
				let result = await ImagePicker.launchImageLibraryAsync();
				if (!result.canceled) {
					await uploadAndSendMessage(result.assets[0].uri);
				} else Alert.alert("Permissions haven't been granted.");
			}
		} catch (error) {
			console.log("something messed up");
			console.log(error);
		}
	};
	//opens camera for user to take image
	const takePhoto = async () => {
		let permissions = await ImagePicker.requestCameraPermissionsAsync();
		try {
			if (permissions?.granted) {
				let result = await ImagePicker.launchCameraAsync();
				if (!result.canceled) {
					await uploadAndSendMessage(result.assets[0].uri);
				} else Alert.alert("Permissions haven't been granted.");
			}
		} catch (error) {
			console.log("something messed up");
			console.log(error);
		}
	};
	//gets location from user device
	const getLocation = async () => {
		let permissions = await Location.requestForegroundPermissionsAsync();
		if (permissions?.granted) {
			const location = await Location.getCurrentPositionAsync({});
			if (location) {
				onSend({
					location: {
						longitude: location.coords.longitude,
						latitude: location.coords.latitude,
					},
				});
			} else Alert.alert("Error occurred while fethcing location");
		} else Alert.alert("Permissions have't been granted");
	};

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={onActionPress}
		>
			<View style={[styles.wrapper, wrapperStyle]}>
				<Text style={[styles.iconText, iconTextStyle]}>+</Text>
			</View>
		</TouchableOpacity>
	);
};
const styles = StyleSheet.create({
	container: {
		width: 26,
		height: 26,
		marginLeft: 10,
		marginBottom: 10,
	},
	wrapper: {
		borderRadius: 13,
		borderColor: "#b2b2b2",
		borderWidth: 2,
		flex: 1,
		justifyContent: "center",
	},
	iconText: {
		color: "#b2b2b2",
		fontWeight: "bold",
		fontSize: 10,
		backgroundColor: "transparent",
		textAlign: "center",
	},
});

export default CustomActions;
