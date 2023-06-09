import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
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
						pickImage();
						return;
					case 1:
						takePhoto();
						return;
					case 2:
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

	const uploadAndSendMessage = async (imageURI) => {
		const uniqueRefString = generateReference(imageURI);
		const response = await fetch(imageURI);
		const blob = await response.blob();
		const newUploadRef = ref(storage, uniqueRefString);
		uploadBytes(newUploadRef, blob).then(async (snapshot) => {
			const imageURL = await getDownloadURL(snapshot.ref);
			onSend({ image: imageURL });
		});
	};

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
			console.log(error);
		}
	};

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
			console.log(error);
		}
	};

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
