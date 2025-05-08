import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Platform,
    Dimensions
} from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? insets.top : 10 }]}>
                <Text style={styles.greeting}>Hello, Guest <Text style={{ color: '#FFD700' }}>👋</Text></Text>
                <TouchableOpacity>
                    <Text style={styles.signIn}>Vietnam Sign In</Text>
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Banner Image with Overlay */}
                <View style={styles.bannerContainer}>
                    <Image
                        source={require('../assets/salon-interior.jpg')}
                        style={styles.bannerImage}
                        resizeMode="cover"
                    />
                </View>

                {/* Book Appointment Button */}
                <TouchableOpacity
                    style={styles.mainButton}
                    onPress={() => navigation.navigate('Book Appointment')}
                    activeOpacity={0.8}
                >
                    <FontAwesome name="calendar-check-o" size={24} color="white" style={styles.buttonIcon} />
                    <Text style={styles.mainButtonText}>Book Appointment</Text>
                </TouchableOpacity>

                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('Points')}
                        activeOpacity={0.7}
                    >
                        <View style={styles.iconContainer}>
                            <FontAwesome name="credit-card" size={24} color="#333" />
                        </View>
                        <Text style={styles.actionText}>Points</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('Referral')}
                        activeOpacity={0.7}
                    >
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name="email-star-outline" size={24} color="#333" />
                        </View>
                        <Text style={styles.actionText}>Referral</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('Coupon')}
                        activeOpacity={0.7}
                    >
                        <View style={styles.iconContainer}>
                            <FontAwesome name="ticket" size={24} color="#333" />
                        </View>
                        <Text style={styles.actionText}>Coupon</Text>
                    </TouchableOpacity>
                </View>

                {/* Secondary Actions */}
                <View style={styles.quickActions}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('Product')}
                        activeOpacity={0.7}
                    >
                        <View style={styles.iconContainer}>
                            <FontAwesome name="shopping-bag" size={24} color="#333" />
                        </View>
                        <Text style={styles.actionText}>Product</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('Inquiry')}
                        activeOpacity={0.7}
                    >
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name="message-outline" size={24} color="#333" />
                        </View>
                        <Text style={styles.actionText}>Inquiry</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('Notifications')}
                        activeOpacity={0.7}
                    >
                        <View style={styles.iconContainer}>
                            <Ionicons name="notifications-outline" size={24} color="#333" />
                        </View>
                        <Text style={styles.actionText}>Notifications</Text>
                    </TouchableOpacity>
                </View>

                {/* Additional spacing at bottom for better scrolling experience */}
                <View style={styles.bottomSpace} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#000',
    },
    greeting: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    signIn: {
        color: '#fff',
        fontWeight: '500',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    bannerContainer: {
        height: 220,
        marginBottom: 20,
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
    },
    bannerOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    logoContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.9)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    logoInitial: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    logoSmall: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        position: 'absolute',
        right: 10,
        bottom: 5,
    },
    logoText: {
        fontSize: 52,
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    locationText: {
        fontSize: 26,
        fontWeight: '600',
        color: '#fff',
        marginTop: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    subLocationText: {
        fontSize: 16,
        color: '#fff',
        marginTop: 4,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    mainButton: {
        backgroundColor: '#000',
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonIcon: {
        marginRight: 10,
    },
    mainButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    actionButton: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        width: width * 0.28,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    iconContainer: {
        marginBottom: 8,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    bottomSpace: {
        height: 20,
    }
});

export default HomeScreen;