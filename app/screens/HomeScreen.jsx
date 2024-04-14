import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

const data = [
    { id: '1', title: 'Cashier', iconName: 'dollar', screen:'searchSupplier' },
    { id: '2', title: 'Checker', iconName: 'check',  screen: 'QRCodeScanner'},
    { id: '2', title: 'Weighter', iconName: 'balance-scale', screen: 'QRCodeScanner' },
    { id: '2', title: 'Accountant', iconName: 'money', screen: 'QRCodeScanner' },
    // { id: '3', title: 'Button 3', iconName: 'ios-notifications' },
    // { id: '4', title: 'Button 4', iconName: 'ios-person' },
    // { id: '5', title: 'Button 5', iconName: 'ios-chatbubbles' },
    // { id: '6', title: 'Button 6', iconName: 'ios-calendar' },
    // Add more data as needed
];

function HomeScreen() {
      const navigation = useNavigation()
        const renderItem = ({ item }) => (
            <TouchableOpacity style={styles.buttonContainer} onPress={()=>{
                      navigation.navigate(item.screen, {'next': item.title})
            }}>
                <Icon name={item.iconName} size={70} color="black" />
                <Text style={styles.buttonText}>{item.title}</Text>
            </TouchableOpacity>
        );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.flatListContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    flatListContainer: {
        paddingHorizontal: 60,
        paddingVertical: 100,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        borderWidth: 2,
        padding: 20,
        borderColor:'#263238',
        borderRadius:12

    },
    buttonText: {
        marginTop: 10,
        fontSize: 16,
    },
});


export default HomeScreen;
