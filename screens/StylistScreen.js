import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,
    ScrollView,
    Platform,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const stylistData = [
    {
        id: 1,
        name: 'Chandeth',
        image: require('../assets/users/chandeth.jpg'),
        nationality: 'Cambodian Hairstylist',
        services: [
            { type: 'Ladys Cut', price: '$18' },
            { type: 'Mens Cut', price: '$15' },
            { type: 'Kids Cut', price: '$11' }
        ]
    },
    {
        id: 2,
        name: 'Mochi',
        image: require('../assets/users/mochi.jpg'),
        nationality: 'Cambodian Hairstylist',
        services: [
            { type: "Lady's Cut", price: '$18' },
            { type: "Men's Cut", price: '$15' },
            { type: 'Kids Cut', price: '$11' }
        ]
    },
    {
        id: 3,
        name: 'Takuma',
        image: require('../assets/users/takuma.jpg'),
        nationality: 'Japanese Hairstylist',
        services: [
            { type: "Men's Hair Cut", price: '$35' },
            { type: "Lady's Hair Cut", price: '$40' },
            { type: 'Kids Cut', price: '$25' }
        ]
    },
    {
        id: 4,
        name: 'Chiva',
        image: require('../assets/users/chiva.jpg'),
        nationality: 'Top stylist Price',
        services: [
            { type: "Lady's Cut", price: '$21' },
            { type: "Men's Cut", price: '$18' },
            { type: 'Kids Cut', price: '$14' }
        ]
    },
    {
        id: 5,
        name: 'Hana',
        image: require('../assets/users/hana.jpg'),
        nationality: 'Japanese Hairstylist',
        services: [
            { type: "Lady's Cut", price: '$25' },
            { type: "Men's Cut", price: '$20' },
            { type: 'Kids Cut', price: '$15' }
        ]
    },
    {
        id: 6,
        name: 'Any Cambodian',
        image: require('../assets/users/cambodia.png'),
    },
    {
        id: 7,
        name: 'Any top stylist Cambodian',
        image: require('../assets/users/cambodia.png'),
    },
    {
        id: 8,
        name: 'Any Japanese',
        image: require('../assets/users/japan.jpg'),
    }
];

const StylistScreen = ({ navigation, route }) => {
    const [selectedStylist, setSelectedStylist] = useState(null);
    const branchName = "grow Tokyo BKK"; // You can pass this from the previous screen if needed

    const handleStylistSelect = (stylistId) => {
        setSelectedStylist(stylistId);
    };

    const handleContinue = () => {
        if (selectedStylist) {
            navigation.navigate('ServiceScreen');
        }
    };

    const renderStylistServices = (services) => {
        if (!services) return null;

        return services.map((service, index) => (
            <Text key={index} style={styles.serviceText}>
                ★{service.type} {service.price} {index < services.length - 1 ? '' : ''}
            </Text>
        ));
    };

    // Progress steps data
    const progressSteps = [
        { id: 1, label: 'Staff', active: true },
        { id: 2, label: 'Services', active: false },
        { id: 3, label: 'Date & Time', active: false }
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color="#fff"
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{branchName}</Text>
            </View>

            <View style={styles.mainProgressContainer}>
                <View style={styles.progressContainer}>
                    {progressSteps.map((step, index) => (
                        <React.Fragment key={step.id}>
                            <View style={styles.progressItem}>
                                <View style={step.active ? styles.activeProgressDot : styles.inactiveProgressDot}></View>
                                <Text style={step.active ? styles.activeProgressText : styles.inactiveProgressText}>
                                    {step.label}
                                </Text>
                            </View>
                            {index < progressSteps.length - 1 && (
                                <View style={[
                                    styles.progressBar,
                                    { width: width * 0.15 }  // Dynamic width based on screen size
                                ]}></View>
                            )}
                        </React.Fragment>
                    ))}
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.screenTitle}>Choose Your Stylist</Text>
                <View style={styles.stylistContainer}>
                    {stylistData.map((stylist) => (
                        <TouchableOpacity
                            key={stylist.id}
                            style={styles.stylistCard}
                            activeOpacity={0.8}
                            onPress={() => handleStylistSelect(stylist.id)}
                        >
                            <View style={styles.stylistInfo}>
                                <Image
                                    source={stylist.image}
                                    style={styles.stylistImage}
                                />
                                <View style={styles.stylistTextContainer}>
                                    <Text style={[
                                        styles.stylistName,
                                        (!stylist.nationality && !stylist.services) && styles.centerText
                                    ]}>
                                        {stylist.name}
                                    </Text>
                                    {stylist.nationality && (
                                        <Text style={styles.stylistNationality}>
                                            {stylist.nationality}
                                            {renderStylistServices(stylist.services)}
                                        </Text>
                                    )}
                                </View>
                            </View>

                            <View style={styles.radioContainer}>
                                <View style={[
                                    styles.radioButton,
                                    selectedStylist === stylist.id && styles.radioButtonSelected
                                ]}>
                                    {selectedStylist === stylist.id && (
                                        <View style={styles.radioButtonInner} />
                                    )}
                                </View>
                            </View>

                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[
                        styles.nextButton,
                        !selectedStylist && styles.disabledButton
                    ]}
                    onPress={handleContinue}
                    disabled={!selectedStylist}
                >
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#000',
        height: 140,
        borderBottomLeftRadius: 17,
        borderBottomRightRadius: 17,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 45,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        marginTop: -30,
        textAlign: 'center',
    },
    mainProgressContainer: {
        paddingHorizontal: 15,
        marginTop: -23,
    },
    progressContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: width * 0.03, // Dynamic padding based on screen width
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        height: 64,
    },
    progressItem: {
        alignItems: 'center',
        flex: 1,
    },
    progressBar: {
        height: 1.5,
        marginTop: 20,
        backgroundColor: '#ccc',
        // width is set dynamically in the component
    },
    activeProgressDot: {
        width: width * 0.035, // Dynamic size based on screen width
        height: width * 0.035, // Dynamic size
        borderRadius: width * 0.02, // Dynamic size for perfect circle
        backgroundColor: '#000',
        marginBottom: 5,
        minWidth: 10, // Minimum size
        minHeight: 10, // Minimum size
    },
    inactiveProgressDot: {
        width: width * 0.035, // Dynamic size
        height: width * 0.035, // Dynamic size
        borderRadius: width * 0.02, // Dynamic size for perfect circle
        backgroundColor: '#ccc',
        marginBottom: 5,
        minWidth: 10, // Minimum size
        minHeight: 10, // Minimum size
    },
    activeProgressText: {
        color: '#000',
        fontSize: Math.max(12, width * 0.03), // Dynamic font size with minimum
        fontWeight: '500',
    },
    inactiveProgressText: {
        color: '#999',
        fontSize: Math.max(12, width * 0.03), // Dynamic font size with minimum
    },
    screenTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 33
    },
    centerText: {
        alignItems: 'center',
        marginTop: 15
    },
    content: {
        flex: 1,
        paddingHorizontal: 15,
    },
    stylistContainer: {
        marginBottom: 20,
    },
    stylistCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 15,
        padding: 12,
        flexDirection: 'row',
        position: 'relative',
        overflow: 'hidden',
    },
    stylistInfo: {
        flexDirection: 'row',
        flex: 1,
    },
    stylistImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    stylistTextContainer: {
        flex: 1,
    },
    stylistName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    stylistNationality: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    serviceText: {
        fontSize: 13,
        color: '#666',
        marginBottom: 2,
    },
    radioContainer: {
        justifyContent: 'center',
        paddingLeft: 10,
    },
    radioButton: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonSelected: {
        borderColor: '#000',
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#000',
    },
    selectionOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        zIndex: 1,
    },
    footer: {
        backgroundColor: '#000',
        padding: 15,
        paddingBottom: Platform.OS === 'ios' ? 30 : 15,
        height: 97,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    nextButton: {
        backgroundColor: '#fff',
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#fff',
    },
    nextButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default StylistScreen;