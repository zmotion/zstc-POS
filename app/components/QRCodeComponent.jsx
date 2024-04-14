import React, { useState } from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QrCodePage = () => {
    const [qrData, setQrData] = useState('Nothing But The Best'); // Replace with your desired data

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <QRCode
                value={qrData}
                size={250} // Adjust size as needed (default: 300)
                ecl="LOW" // Error Correction Level (options: 'LOW', 'MEDIUM', 'HIGH', 'QUARTILE', 'HIGHER')
                bgColor="#4CAF50" // Background color (default: 'black')
                fgColor="#ffffff" // Foreground color (default: 'white')
            />
            {/* Optional: Add a button or input field to update qrData */}
        </View>
    );
};

export default QrCodePage;
