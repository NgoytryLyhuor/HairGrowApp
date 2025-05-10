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
    ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const branchData = [
    { id: 1, name: 'grow Tokyo BKK', image: require('../assets/salon-interior.jpg') },
    { id: 2, name: 'grow Tokyo BKK', image: require('../assets/salon-interior.jpg') },
    { id: 3, name: 'grow Tokyo BKK', image: require('../assets/salon-interior.jpg') },
];

const BranchScreen = ({ navigation }) => {
    const [selectedBranch, setSelectedBranch] = useState(null);

    const handleBranchSelect = (branchId) => {
        setSelectedBranch(branchId);
    };

    const handleContinue = () => {
        if (selectedBranch) {
            navigation.navigate('StylistScreen');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? 40 : 10 }]}>
                <TouchableOpacity
                    onPress={() => {
                        // Alternative approach that's more reliable
                        navigation.pop();
                    }}
                    style={[styles.backButton, { zIndex: 10 }]} // slight zIndex increase
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name="chevron-back"
                        size={25}
                        color="#fff"
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Choose Branch</Text>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.branchContainer}>
                    {branchData.map((branch) => (
                        <TouchableOpacity
                            key={branch.id}
                            style={styles.branchCard}
                            activeOpacity={0.8}
                            onPress={() => handleBranchSelect(branch.id)}
                        >
                            <View style={{ position: 'relative' }}>
                                <ImageBackground
                                    source={branch.image}
                                    style={styles.branchImage}
                                    imageStyle={styles.branchImageStyle}
                                />
                                <View style={styles.branchInfo}>
                                    <Text style={styles.branchName}>{branch.name}</Text>
                                </View>

                                {selectedBranch === branch.id && (
                                    <View style={styles.checkIconContainer}>
                                        <View style={styles.checkCircle}>
                                            <Ionicons name="checkmark" size={50} color="#fff" />
                                        </View>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {selectedBranch && (
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.continueButton}
                        onPress={handleContinue}
                    >
                        <Text style={styles.continueButtonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            )}
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
        zIndex: 1
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        marginTop: 27,
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
        marginTop: -15,
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
    // Removed selectedBranchCard style as per requirement
    branchImage: {
        width: '100%',
        height: 180,
    },
    branchImageStyle: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    checkIconContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.52)',
        zIndex: 9,
        borderRadius: 10,
    },
    checkCircle: {
        justifyContent: 'center',
        alignItems: 'center',
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
    footer: {
        backgroundColor: '#000',
        padding: 15,
        height: 100,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    continueButton: {
        backgroundColor: '#fff',
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default BranchScreen;