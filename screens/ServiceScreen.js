import React, { useState, useEffect } from 'react';
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
    Animated,
    Easing
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const serviceCategories = [
    {
        id: 1,
        name: 'CUT INC SHAMPOO and BLOW DRY',
        services: [
            {
                id: 1,
                title: 'Cut (For Men)',
                options: [
                    { type: 'Cambodian Hairstylist', price: '$15' },
                    { type: 'Cambodian Top Hairstylist', price: '$18' },
                    { type: 'Japanese Hairstylist', price: '$35' },
                ],
                image: require('../assets/services/cut-man.jpg'),
            },
            {
                id: 2,
                title: 'Cut (For Lady)',
                options: [
                    { type: 'Cambodian Hairstylist', price: '$18' },
                    { type: 'Cambodian Top Hairstylist', price: '$21' },
                    { type: 'Japanese Hairstylist', price: '$40' },
                ],
                image: require('../assets/services/cut-women.jpg'),
            },
            {
                id: 3,
                title: 'Cut (For Kids under 10 years)',
                options: [
                    { type: 'Cambodian Hairstylist', price: '$11' },
                    { type: 'Cambodian Top Hairstylist', price: '$14' },
                    { type: 'Japanese Hairstylist', price: '$25' },
                ],
                image: require('../assets/services/cut-kid.jpg'),
            }
        ]
    },
    {
        id: 2,
        name: 'SHAMPOO and BLOW DRY',
        services: [
            {
                id: 4,
                title: 'Shampoo and Blow Dry',
                options: [
                    { type: '', price: '$12' },
                ],
                image: require('../assets/services/shampoo.jpg'),
            },
        ]
    },
    {
        id: 3,
        name: 'COLOR',
        services: [
            {
                id: 5,
                title: 'Color',
                options: [
                    { type: 'Regrowth', price: '$40' },
                    { type: 'Short', price: '$55' },
                    { type: 'Medium', price: '$60' },
                    { type: 'Long', price: '$65' },
                ],
                image: require('../assets/services/color.jpg'),
            },
            {
                id: 6,
                title: 'Bleach',
                options: [
                    { type: '', price: '$55~' },
                ],
                image: require('../assets/services/bleach.jpg'),
            },
            {
                id: 7,
                title: 'Foil color',
                options: [
                    { type: 'ask', price: '' },
                ],
                image: require('../assets/services/foil.jpg'),
            },
        ]
    }
];

const ServiceScreen = ({ navigation, route = {} }) => {
    const stylistId = 1;
    const branchName = "grow Tokyo BKK";

    const [expandedCategories, setExpandedCategories] = useState({ });
    const [selectedServices, setSelectedServices] = useState([]);
    const [stylistName, setStylistName] = useState('Chandeth');
    const [animationValues] = useState(() =>
        serviceCategories.reduce((acc, category) => {
            acc[category.id] = new Animated.Value(1);
            return acc;
        }, {})
    );

    useEffect(() => {
        if (route.params?.stylistId) {
            const stylistsData = [
                { id: 1, name: 'Chandeth' },
                { id: 2, name: 'Mochi' },
                { id: 3, name: 'Takuma' },
                { id: 4, name: 'Chiva' },
                { id: 5, name: 'Hana' },
                { id: 6, name: 'Any Cambodian' },
                { id: 7, name: 'Any top stylist Cambodian' },
                { id: 8, name: 'Any Japanese' },
            ];

            const stylist = stylistsData.find(s => s.id === route.params.stylistId);
            if (stylist) {
                setStylistName(stylist.name);
            }
        }
    }, [route.params?.stylistId]);

    const toggleCategory = (categoryId) => {
        const isExpanded = !!expandedCategories[categoryId];

        if (isExpanded) {
            Animated.timing(animationValues[categoryId], {
                toValue: 0,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start(() => {
                setExpandedCategories(prev => ({
                    ...prev,
                    [categoryId]: false
                }));
            });
        } else {
            setExpandedCategories(prev => ({
                ...prev,
                [categoryId]: true
            }));
            Animated.timing(animationValues[categoryId], {
                toValue: 1,
                duration: 200,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start();
        }
    };

    const toggleServiceSelection = (serviceId) => {
        if (selectedServices.includes(serviceId)) {
            setSelectedServices(selectedServices.filter(id => id !== serviceId));
        } else {
            setSelectedServices([...selectedServices, serviceId]);
        }
    };

    const handleContinue = () => {
        navigation.navigate('DateTimeScreen');
    };

    const getCategoryHeight = (categoryId) => {
        const category = serviceCategories.find(c => c.id === categoryId);
        if (!category) return 0;

        let height = 0;
        if (expandedCategories[categoryId]) {
            category.services.forEach(service => {
                height += 80; // Service header height
                height += service.options.length ; // Option rows
                height += 10; // Padding
            });
        }
        return height;
    };

    // Progress steps data with completion status
    const progressSteps = [
        { id: 1, label: 'Staff', status: 'completed' },
        { id: 2, label: 'Services', status: 'active' },
        { id: 3, label: 'Date & Time', status: 'inactive' }
    ];

    // Helper function to determine dot style based on status
    const getProgressDotStyle = (status) => {
        switch(status) {
            case 'completed':
                return styles.completedProgressDot;
            case 'active':
                return styles.activeProgressDot;
            default:
                return styles.inactiveProgressDot;
        }
    };

    // Helper function to determine text style based on status
    const getProgressTextStyle = (status) => {
        switch(status) {
            case 'completed':
                return styles.completedProgressText;
            case 'active':
                return styles.activeProgressText;
            default:
                return styles.inactiveProgressText;
        }
    };

    // Helper function to determine progress bar style based on previous step status
    const getProgressBarStyle = (prevStepStatus) => {
        return [
            styles.progressBar,
            prevStepStatus === 'completed' ? { backgroundColor: '#000' } : {}
        ];
    };

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
                                <View style={getProgressDotStyle(step.status)}>
                                    {step.status === 'completed' && (
                                        <Ionicons name="checkmark" size={Math.max(8, width * 0.02)} color="#fff" />
                                    )}
                                </View>
                                <Text style={getProgressTextStyle(step.status)}>
                                    {step.label}
                                </Text>
                            </View>
                            {index < progressSteps.length - 1 && (
                                <View style={[
                                    ...getProgressBarStyle(step.status),
                                    { width: width * 0.15 }  // Dynamic width based on screen size
                                ]}></View>
                            )}
                        </React.Fragment>
                    ))}
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.stylistTitle}>{stylistName}'s Services</Text>

                {serviceCategories.map((category) => (
                    <View key={category.id} style={styles.categoryContainer}>
                        <TouchableOpacity
                            style={styles.categoryHeader}
                            onPress={() => toggleCategory(category.id)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.categoryName}>{category.name}</Text>
                            <Ionicons
                                name={expandedCategories[category.id] ? "chevron-up" : "chevron-down"}
                                size={15}
                                color="#333"
                            />
                        </TouchableOpacity>

                        <Animated.View
                            style={[
                                styles.servicesContainer,
                                {
                                    height: animationValues[category.id].interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, getCategoryHeight(category.id)],
                                    }),
                                    opacity: animationValues[category.id]
                                }
                            ]}
                        >
                            {expandedCategories[category.id] && category.services.map((service) => (
                                <View key={service.id}>
                                    <TouchableOpacity
                                        style={styles.serviceHeader}
                                        onPress={() => toggleServiceSelection(service.id)}
                                        activeOpacity={0.7}
                                    >
                                        <View style={styles.serviceBox}>
                                            <View style={styles.serviceHeaderContent}>
                                                <Image
                                                    source={service.image}
                                                    style={styles.serviceImage}
                                                />
                                            </View>
                                            <View>
                                                <Text style={styles.serviceTitle}>{service.title}</Text>
                                                <View style={styles.optionsContainer}>
                                                    {service.options.map((option, index) => (
                                                        <View key={index} style={styles.optionRow}>
                                                            {option.type ? (
                                                                <Text style={styles.optionType}>{option.type}</Text>
                                                            ) : null}
                                                            <Text style={styles.optionPrice}> {option.price}</Text>
                                                        </View>
                                                    ))}
                                                </View>
                                            </View>
                                        </View>
                                        <View style={[
                                            styles.checkbox,
                                            selectedServices.includes(service.id) && styles.checkboxSelected
                                        ]}>
                                            {selectedServices.includes(service.id) && (
                                                <Ionicons name="checkmark" size={16} color="#fff" />
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </Animated.View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <Text style={styles.footerStaff}> Mochi </Text>
                <TouchableOpacity
                    style={[
                        styles.nextButton,
                        selectedServices.length === 0 && styles.disabledButton
                    ]}
                    onPress={handleContinue}
                    disabled={selectedServices.length === 0}
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
    serviceBox: {
        flexDirection: 'row',
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
        height: 64
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
    completedProgressDot: {
        width: width * 0.035, // Dynamic size based on screen width
        height: width * 0.035, // Dynamic size
        borderRadius: width * 0.02, // Dynamic size for perfect circle
        backgroundColor: '#4CAF50',
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 10, // Minimum size
        minHeight: 10, // Minimum size
    },
    activeProgressDot: {
        width: width * 0.035, // Dynamic size
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
    completedProgressText: {
        color: '#000',
        fontSize: Math.max(12, width * 0.03), // Dynamic font size with minimum
        fontWeight: '500',
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
    content: {
        flex: 1,
        paddingHorizontal: 15,
    },
    stylistTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 18,
    },
    categoryContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        paddingVertical: 24,
    },
    categoryName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    servicesContainer: {
        overflow: 'hidden',
    },
    serviceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        paddingVertical: 8,
    },
    serviceHeaderContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    serviceImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 15,
    },
    serviceTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#333',
    },
    optionRow: {
        flexDirection: 'row',
    },
    optionType: {
        fontSize: 12,
        color: '#666',
    },
    optionPrice: {
        fontSize: 14,
        color: '#666',
    },
    checkbox: {
        width: 22,
        height: 22,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    footer: {
        backgroundColor: '#000',
        padding: 15,
        paddingBottom: Platform.OS === 'ios' ? 30 : 15,
        height: 80, // Dynamic height based on platform
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerStaff: {
        color: '#fff',
        fontSize: 16
    },
    nextButton: {
        backgroundColor: '#fff',
        borderRadius: 8,
        height: 40,
        width: width * 0.25, // Dynamic width based on screen size
        minWidth: 100, // Minimum width
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

export default ServiceScreen;