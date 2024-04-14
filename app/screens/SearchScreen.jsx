import {
	Button,
	TouchableWithoutFeedback,
	FlatList,
	SafeAreaView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	StyleSheet,
	Keyboard,
	Pressable,
	Alert,
} from "react-native";
import * as Print from "expo-print";
import SunmiPrinter from "@heasy/react-native-sunmi-printer";
import { Autocomplete, filterData } from "react-native-autocomplete-input";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import PrintButton from "../components/PrintButton";

import { SPrinter } from "@makgabri/react-native-sunmi-printer";
import QRCode from "react-native-qrcode-svg";
import QrCodePage from "../components/QRCodeComponent";

export default function SearchScreen() {
	const navigation = useNavigation();
	const [input, setInput] = useState("");
	const [data, setData] = useState([]);
	const [isShown, setShown] = useState(false);
	const [qrData, setQrData] = useState();

	const handleAddSupplier = () => {
		console.log("Add Supplier button pressed");

		navigation.navigate("AddSupplier");
	};

	const handlePrint = async () => {
		console.log("Print button pressed");

		if (!qrData) {
			return () => {
				alert("Please enter a QR Code number");
			};
		}

		setShown(true);
	};

	const onChangeText = async (text) => {
		setInput(text);
		// get host from localhost:19002 above the qrcode
		if (text.length > 2) {
			// const endpoint = `http://192.168.30.21:4000/api/search?location=${text}&limit=${5}`;
			// let res = await fetch(endpoint);
			// if (res) {
			//   let data = await res.json();
			//   if (data.length > 0) setData(data);
			// }
			let data = [
				{
					id: 1,
					name: "Michael Rodgers",
					phone: "0888888888",
				},
				{
					id: 2,
					name: "Jane Doe",
					phone: "0999999999",
				},
				{
					id: 3,
					name: "John Smith",
					phone: "0777777777",
				},
				{
					id: 4,
					name: "Emily Brown",
					phone: "0666666666",
				},
				{
					id: 5,
					name: "David Wilson",
					phone: "0555555555",
				},
				{
					id: 6,
					name: "Sarah Davis",
					phone: "0444444444",
				},
				{
					id: 7,
					name: "Robert Martinez",
					phone: "0333333333",
				},
				{
					id: 8,
					name: "Jennifer Thompson",
					phone: "0222222222",
				},
				{
					id: 9,
					name: "Christopher Anderson",
					phone: "0111111111",
				},
				{
					id: 10,
					name: "Amanda Taylor",
					phone: "0000000000",
				},
				{
					id: 11,
					name: "Daniel Harris",
					phone: "0999999999",
				},
				{
					id: 12,
					name: "Olivia Clark",
					phone: "0888888888",
				},
				{
					id: 13,
					name: "Matthew Lewis",
					phone: "0777777777",
				},
				{
					id: 14,
					name: "Sophia Turner",
					phone: "0666666666",
				},
				{
					id: 15,
					name: "Ethan Rodriguez",
					phone: "0555555555",
				},
				{
					id: 16,
					name: "Ava Martinez",
					phone: "0444444444",
				},
				{
					id: 17,
					name: "Alexander Hernandez",
					phone: "0333333333",
				},
				{
					id: 18,
					name: "Mia Nelson",
					phone: "0222222222",
				},
				{
					id: 19,
					name: "William Thompson",
					phone: "0111111111",
				},
				{
					id: 20,
					name: "Charlotte Adams",
					phone: "0000000000",
				},
				{
					id: 21,
					name: "James Turner",
					phone: "0999999999",
				},
				{
					id: 22,
					name: "Harper Scott",
					phone: "0888888888",
				},
				{
					id: 23,
					name: "Benjamin Green",
					phone: "0777777777",
				},
				{
					id: 24,
					name: "Amelia Carter",
					phone: "0666666666",
				},
				{
					id: 25,
					name: "Daniel Hernandez",
					phone: "0555555555",
				},
				{
					id: 26,
					name: "Mia Adams",
					phone: "0444444444",
				},
				{
					id: 27,
					name: "Alexander Wilson",
					phone: "0333333333",
				},
				{
					id: 28,
					name: "Sophia Davis",
					phone: "0222222222",
				},
			];
			setData(data);
		}
	};

	const getItemText = (item) => {
		setQrData(item.id);
		return (
			<View style={{ flexDirection: "row", alignItems: "center", padding: 15 }}>
				<View style={{ marginLeft: 10, flexShrink: 1 }}>
					<Text style={{ fontWeight: "700" }}>{item.name}</Text>
					<Text style={{ fontSize: 12 }}>{item.phone}</Text>
				</View>
			</View>
		);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<SafeAreaView className="px-2 pt-3 bg-gray-100 ">
				<Text className="pt-3 text-3xl font-bold text-center">Search Suppliers</Text>

				<View className="mt-2 mb-4 border-b border-gray-400" />

				<View className="flex-row justify-between w-full p-4 mb-4 bg-white rounded-lg shadow-md">
					<View className="">
						<TextInput
							onChangeText={onChangeText}
							value={input}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg"
							placeholder="Enter The Supplier Name"
							placeholderTextColor="#999"
						/>

						{input.length > 0 && data.length > 0 && (
							<FlatList
								data={data}
								showsVerticalScrollIndicator={false}
								renderItem={({ item, index }) => (
									<Pressable
										style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
										onPress={() => {
											setQrData(`${item.id}-${item.name}`);
											setData([]);
											setShown(true);
										}}
									>
										{getItemText(item)}
									</Pressable>
								)}
								keyExtractor={(item, index) => item.place_id + index}
							/>
						)}
					</View>

					<View className="">
						<TouchableOpacity
							onPress={handleAddSupplier}
							className="px-4 py-2 bg-blue-200 shadow-md "
						>
							<Icon name="plus" size={20} color="black" />
						</TouchableOpacity>
					</View>
				</View>
				{!isShown ? (
					<View className="">
						<TouchableOpacity
							onPress={handlePrint}
							className="px-4 py-2 bg-blue-200 shadow-md"
						>
							<Text className="text-xl font-bold text-center">Print QRCode</Text>
						</TouchableOpacity>
					</View>
				) : (
					<View style={{ flex: 1 }}>
						<Text className="text-xl font-bold text-center">qrData</Text>
						<QRCode
							value={qrData}
							size={250} // Adjust size as needed (default: 300)
							ecl="LOW" // Error Correction Level (options: 'LOW', 'MEDIUM', 'HIGH', 'QUARTILE', 'HIGHER')
							bgColor="#4CAF50" // Background color (default: 'black')
							fgColor="#ffffff" // Foreground color (default: 'white')
						/>
						{/* Optional: Add a button or input field to update qrData */}
						<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
							<TouchableOpacity onPress={() => setShown(false)}>
								<Text
									style={{ fontSize: 20, fontWeight: "bold", color: "#4CAF50" }}
								>
									Update QRCode
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	autocompleteContainer: {
		flex: 1,
		left: 0,
		position: "absolute",
		right: 0,
		top: 0,
		zIndex: 1,
	},
});
