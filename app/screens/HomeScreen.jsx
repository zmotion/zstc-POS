import {useEffect} from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const data = [
  {
    id: "1",
    title: "Cashier",
    iconName: "dollar",
    screen: "searchSupplier",
    color: "#FF6347",
  },
  {
    id: "2",
    title: "Checker",
    iconName: "check",
    screen: "QRCodeScanner",
    color: "#6A5ACD",
  },
  {
    id: "3",
    title: "Weighter",
    iconName: "balance-scale",
    screen: "QRCodeScanner",
    color: "#FFA500",
  },
  {
    id: "4",
    title: "Accountant",
    iconName: "money",
    screen: "QRCodeScanner",
    color: "#32CD32",
  },
];

function HomeScreen() {
  const navigation = useNavigation();

  // useEffect(() => {
  //   setInterval(() => {
  //     checkCredentials();
  //   }, 2000);
  // })

  // const checkCredentials = async () => {
  //   const data_token  = await AsyncStorage.getItem('token');
  //   if (!data_token) {
  //     navigation.navigate('login');
  //   } else {
  //     navigation.navigate('home');
  //   }
  // };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.buttonContainer, { backgroundColor: item.color }]}
      onPress={() => {
        navigation.navigate(item.screen, { next: item.title });
      }}
    >
      <Icon name={item.iconName} size={70} color="black" />
      <Text style={styles.buttonText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headTitle}>Cloves Buying Terminal</Text>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  headTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
    textAlign: "center",
  },
  flatListContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderWidth: 2,
    padding: 20,
    borderRadius: 12,
  },
  buttonText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default HomeScreen;
