import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Assuming you're using react-navigation

const PrintButton = () => {
    const navigation = useNavigation();

    const handlePress = () => {
        console.log("Entering QRCode Generator View");
        navigation.navigate('QRCodeGenerator');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Print</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        paddingHorizontal: 2,
        paddingVertical: 3,
        backgroundColor: '#f2dede', // Light red color
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2, // For Android shadow
    },
    buttonText: {
        flex: 1,
        paddingLeft: 8,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PrintButton;
