import React from 'react';
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
    ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const BookingScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? 40 : 10 }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Choose Branch</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.branchContainer}>
                    <TouchableOpacity style={styles.branchCard} activeOpacity={0.8}>
                        <ImageBackground
                            source={require('../assets/salon-interior.jpg')}
                            style={styles.branchImage}
                            imageStyle={styles.branchImageStyle}
                        >
                        </ImageBackground>
                        <View style={styles.branchInfo}>
                            <Text style={styles.branchName}>grow Tokyo BKK</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.branchCard} activeOpacity={0.8}>
                        <ImageBackground
                            source={require('../assets/salon-interior.jpg')}
                            style={styles.branchImage}
                            imageStyle={styles.branchImageStyle}
                        >
                        </ImageBackground>
                        <View style={styles.branchInfo}>
                            <Text style={styles.branchName}>grow Tokyo BKK</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.branchCard} activeOpacity={0.8}>
                        <ImageBackground
                            source={require('../assets/salon-interior.jpg')}
                            style={styles.branchImage}
                            imageStyle={styles.branchImageStyle}
                        >
                        </ImageBackground>
                        <View style={styles.branchInfo}>
                            <Text style={styles.branchName}>grow Tokyo BKK</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        paddingBottom: 20,
        height: 95,
        backgroundColor: '#000',
        borderBottomLeftRadius: 17,
        borderBottomRightRadius: 17,
        zIndex: 99
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        marginTop: 23
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        flex: 1,
        textAlign: 'center',
        marginTop: 20,
        marginLeft: -50
    },
    content: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 15,
        marginTop: -15
    },
    branchContainer: {
        marginTop: 10,
    },
    branchCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        height: 232,
        overflow: 'hidden'
    },
    branchImage: {
        width: '100%',
        height: 180,
    },
    branchImageStyle: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    branchOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    branchTitleContainer: {
        alignItems: 'center',
    },
    branchTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    branchSubtitle: {
        fontSize: 22,
        color: '#fff',
    },
    branchLocation: {
        fontSize: 18,
        color: '#fff',
        marginTop: 5,
    },
    branchInfo: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    branchName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    proBadge: {
        backgroundColor: '#FFD700',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    proBadgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#000',
    },
});

export default BookingScreen;