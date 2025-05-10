import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Platform,
    Dimensions,
    TextInput,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ConfirmBookingScreen = ({ navigation, route = {} }) => {
    // Extract parameters from route or use default values
    const {
        stylistId = 2,
        branchName = "grow Tokyo BKK",
        selectedServices = [1],
        selectedDate = { day: 11, month: 4, year: 2025 },
        selectedTime = { time: '10:30 AM' }
    } = route.params || {};

    // State for form inputs
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [serviceNote, setServiceNote] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [referralCode, setReferralCode] = useState('');

    // Stylist info based on stylistId
    const [stylistName, setStylistName] = useState('Mochi');

    // Service info
    const [serviceTitle, setServiceTitle] = useState('Cut (For Men)');
    const [servicePrice, setServicePrice] = useState('$15');

    // Format the date for display
    const formatDate = (date) => {
        if (!date) return '';
        return `${date.year}-${String(date.month + 1).padStart(2, '0')}-${String(date.day).padStart(2, '0')} at ${selectedTime.time}`;
    };

    // Handle booking confirmation
    const handleBookNow = () => {
        if (!name || !contactNumber) {
            alert('Please enter your name and contact number');
            return;
        }

        // In a real app, you would make an API call to save the booking
        alert(`Booking confirmed for ${name} at ${formatDate(selectedDate)}`);
        // Navigate to success screen or home
        // navigation.navigate('BookingSuccess');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons
                        name="chevron-back"
                        size={24}
                        color="#fff"
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Confirm Booking</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Your Information Section */}
                <Text style={styles.sectionTitle}>Your Information</Text>
                <View style={styles.infoContainer}>
                    <TextInput
                        marginBottom={12}
                        style={styles.textInput}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Contact Number"
                        value={contactNumber}
                        onChangeText={setContactNumber}
                        keyboardType="phone-pad"
                    />
                </View>

                {/* Time Slot Section */}
                <Text style={styles.sectionTitle}>Time Slot</Text>
                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Date & Time</Text>
                        <Text style={styles.infoValue}>{formatDate(selectedDate)}</Text>
                    </View>
                </View>

                {/* Location Information Section */}
                <Text style={styles.sectionTitle}>Location Information</Text>
                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Branch Name</Text>
                        <Text style={styles.infoValue}>{branchName}</Text>
                    </View>
                </View>

                {/* Stylist Section */}
                <Text style={styles.sectionTitle}>Stylist</Text>
                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Stylist</Text>
                        <Text style={styles.infoValue}>{stylistName}</Text>
                    </View>
                </View>

                {/* Services Section */}
                <Text style={styles.sectionTitle}>Services</Text>
                <View style={styles.infoContainer}>
                    <View style={styles.serviceRow}>
                        <Image
                            source={require('../assets/services/cut-man.jpg')} // Update path to your actual image
                            style={styles.serviceImage}
                            defaultSource={require('../assets/services/cut-man.jpg')} // Fallback image
                        />
                        <View style={styles.serviceInfo}>
                            <Text style={styles.serviceTitle}>{serviceTitle}</Text>
                            <Text style={styles.serviceDescription}>Cambodian Hairstylist $15</Text>
                            <Text style={styles.serviceDescription}>Cambodian Top Hairstylist $18</Text>
                            <Text style={styles.serviceDescription}>Japanese Hairstylist $35</Text>
                        </View>
                    </View>
                </View>

                {/* Service Note Section */}
                <TextInput
                    style={[styles.textInput, styles.noteInput, styles.infoContainer]}
                    placeholder="Add a note about your service"
                    value={serviceNote}
                    onChangeText={setServiceNote}
                    multiline
                />

                {/* Coupon Section */}
                <View style={styles.infoContainer_coupon_referral}>
                    <View style={styles.couponRow}>
                        <Text style={styles.couponLabel}>Coupon <Text style={styles.optionalText}>(optional)</Text></Text>
                        <TouchableOpacity style={styles.addButton}>
                            <Text style={styles.addButtonText}>Add Coupon</Text>
                            <Ionicons name="chevron-forward" size={20} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Referral Code Section */}
                <View style={styles.infoContainer_coupon_referral}>
                    <View style={styles.couponRow}>
                        <Text style={styles.couponLabel}>Referral Code <Text style={styles.optionalText}>(optional)</Text></Text>
                        <TouchableOpacity style={styles.addButton}>
                            <Text style={styles.addButtonText}>Add Code</Text>
                            <Ionicons name="chevron-forward" size={20} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Space at bottom for button */}
                <View style={styles.bottomSpace} />
            </ScrollView>

            {/* Book Now Button */}
            <View style={styles.bookButtonContainer}>
                <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
                    <Text style={styles.bookButtonText}>Book Now</Text>
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
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#000',
        height: 95,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 42
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        marginTop: 30,
        textAlign: 'center',
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '500',
        color: '#666',
        marginBottom: 10,
    },
    infoContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 10,
    },
    infoContainer_coupon_referral: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 20,
        marginBottom: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
    },
    noteInput: {
        height: 70,
        textAlignVertical: 'top',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
    },
    infoLabel: {
        fontSize: 14,
        color: '#666',
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    serviceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    serviceImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#ddd',
    },
    serviceInfo: {
        marginLeft: 12,
        flex: 1,
    },
    serviceTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    serviceDescription: {
        fontSize: 14,
        color: '#666',
    },
    couponRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    couponLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    optionalText: {
        color: '#999',
        fontWeight: 'normal',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        marginRight: 4,
    },
    bottomSpace: {
        height: 100,
    },
    bookButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: '#000',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        height: 100,
    },
    bookButton: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
    },
    bookButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
});

export default ConfirmBookingScreen;