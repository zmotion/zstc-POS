import React from "react";
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

const data = [
  {
    id: "1",
    title: "Registrar",
    iconName: "file-text",
    screen: "searchSupplier",
    color: "#FF6347",
  },
  {
    id: "2",
    title: "Grading",
    iconName: "check-circle",
    screen: "QRCodeScanner",
    color: "#6A5ACD",
  },
  {
    id: "3",
    title: "Weighting",
    iconName: "balance-scale",
    screen: "QRCodeScanner",
    color: "#FFA500",
  },
  {
    id: "4",
    title: "Cashier",
    iconName: "money",
    screen: "QRCodeScanner",
    color: "#32CD32",
  },
];

const Header = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headMain}>ZSTC</Text>
    <Text style={styles.headTitle}>Smart Terminal</Text>
    <Text style={styles.station}>CHAKE CHAKE STATION</Text>
  </View>
);

const HomeScreen = () => {
  const navigation = useNavigation();

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
      <Header />
      <FlatList
        data={data}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    padding: 20,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
  },
  headTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  station: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#D05427",
    marginBottom: 20,
  },
  headMain: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#024B4E",
    marginTop: 20,
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
    elevation: 5,
  },
  buttonText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default HomeScreen;
