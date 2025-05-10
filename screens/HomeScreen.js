import React, { useState, useRef, useEffect } from 'react';
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
    FlatList,
    Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Calculate dynamic sizes based on screen width
const SCREEN_PADDING = 26;
const GAP_BETWEEN_BUTTONS = 10;
const BUTTON_COUNT_PER_ROW = 3;
const actionButtonWidth = (width - (2 * SCREEN_PADDING) - ((BUTTON_COUNT_PER_ROW - 1) * GAP_BETWEEN_BUTTONS)) / BUTTON_COUNT_PER_ROW;
const actionButtonHeight = actionButtonWidth * 0.86; // Keep similar aspect ratio as original

const HomeScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    // Sample banner images
    const bannerImages = [
        require('../assets/salon-interior.jpg'),
        require('../assets/salon-interior.jpg'), // Replace with your other images
        require('../assets/salon-interior.jpg')  // Replace with your other images
    ];

    // Auto-scroll functionality with slower timing
    useEffect(() => {
        let autoScrollInterval;
        
        const startAutoScroll = () => {
            autoScrollInterval = setInterval(() => {
                if (activeIndex === bannerImages.length - 1) {
                    // Smooth scroll to first item with a slower animation
                    flatListRef.current?.scrollToIndex({
                        index: 0,
                        animated: true,
                        viewPosition: 0.5,
                        viewOffset: 0
                    });
                } else {
                    // Smooth scroll to next item with a slower animation
                    flatListRef.current?.scrollToIndex({
                        index: activeIndex + 1,
                        animated: true,
                        viewPosition: 0.5,
                        viewOffset: 0
                    });
                }
            }, 5000); // Changed from 3000 to 5000 (5 seconds) for slower transitions
        };

        startAutoScroll();

        // Clean up interval on component unmount
        return () => {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
            }
        };
    }, [activeIndex]);

    const renderBannerItem = ({ item, index }) => {
        return (
            <Animated.View style={styles.bannerItemContainer}>
                <Image
                    source={item}
                    style={styles.bannerImage}
                    resizeMode="cover"
                />
            </Animated.View>
        );
    };

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );

    const handleScrollEnd = (event) => {
        const slideWidth = width - 40;
        const offset = event.nativeEvent.contentOffset.x;
        const index = Math.round(offset / slideWidth);
        setActiveIndex(index);
    };

    const getItemLayout = (_, index) => ({
        length: width - 40,
        offset: (width - 40) * index,
        index,
    });

    // Handle navigation to LoginScreen
    const navigateToLogin = () => {
        navigation.navigate('Auth');
    };

    const navigateToBranchScreen = () => {
        navigation.navigate('BranchScreen');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Updated Header with Login Navigation */}
            <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? insets.top : 10 }]}>
                <Text style={styles.greeting}>Hello, Guest <Text style={{ color: '#FFD700' }}>
                    <Image
                        source={require('../assets/icons/ic_hi.png')}
                        style={styles.greetingIcon}
                        resizeMode="cover"
                    />
                </Text></Text>
                <TouchableOpacity onPress={navigateToLogin} activeOpacity={0.7}>
                    <Text style={styles.locationSignIn}>
                        Cambodia <Text style={styles.signIn}>Sign In</Text>
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Rest of the component remains the same */}
            {/* Banner Image Carousel */}
            <View style={styles.bannerContainer}>
                <FlatList
                    ref={flatListRef}
                    data={bannerImages}
                    renderItem={renderBannerItem}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    onMomentumScrollEnd={handleScrollEnd}
                    getItemLayout={getItemLayout}
                    snapToAlignment="center"
                    snapToInterval={width - 40}
                    decelerationRate={0.8} // Slower deceleration for smoother scrolling
                    scrollEventThrottle={16} // More frequent updates for smoother animation
                />
                
                {/* Animated Pagination Dots */}
                <View style={styles.pagination}>
                    {bannerImages.map((_, index) => {
                        const inputRange = [
                            (index - 1) * (width - 40),
                            index * (width - 40),
                            (index + 1) * (width - 40)
                        ];
                        
                        const dotWidth = scrollX.interpolate({
                            inputRange,
                            outputRange: [8, 16, 8], // Width changes based on active state
                            extrapolate: 'clamp'
                        });
                        
                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.3, 1, 0.3], // Opacity changes based on active state
                            extrapolate: 'clamp'
                        });
                        
                        return (
                            <Animated.View
                                key={index}
                                style={[
                                    styles.paginationDot,
                                    { 
                                        width: dotWidth,
                                        opacity: opacity,
                                        backgroundColor: index === activeIndex ? '#000' : '#D9D9D9' 
                                    }
                                ]}
                            />
                        );
                    })}
                </View>
            </View>

            {/* Main Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Book Appointment Button */}
                <TouchableOpacity
                    style={styles.mainButton}
                    onPress={navigateToBranchScreen}
                    activeOpacity={0.8}
                >
                    <Image
                        source={require('../assets/icons/calendar.png')}
                        style={styles.bookIcon}
                    />
                    <Text style={styles.mainButtonText}>Book Appointment</Text>
                </TouchableOpacity>

                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('Points')}
                    >
                        <View style={styles.iconContainer}>
                            <Image
                                source={require('../assets/icons/points.png')}
                                style={styles.actionIcon}
                            />
                        </View>
                        <Text style={styles.actionText}>Points</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('Referral')}
                    >
                        <View style={styles.iconContainer}>
                            <Image
                                source={require('../assets/icons/referral.png')}
                                style={styles.actionIcon}
                            />
                        </View>
                        <Text style={styles.actionText}>Referral</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('Coupon')}
                    >
                        <View style={styles.iconContainer}>
                            <Image
                                source={require('../assets/icons/coupon.png')}
                                style={styles.actionIcon}
                            />
                        </View>
                        <Text style={styles.actionText}>Coupon</Text>
                    </TouchableOpacity>
                </View>

                {/* Secondary Actions */}
                <View style={styles.quickActions}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('Product')}
                    >
                        <View style={styles.iconContainer}>
                            <Image
                                source={require('../assets/icons/product.png')}
                                style={styles.actionIcon}
                            />
                        </View>
                        <Text style={styles.actionText}>Product</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('Inquiry')}
                    >
                        <View style={styles.iconContainer}>
                            <Image
                                source={require('../assets/icons/inquiry.png')}
                                style={styles.actionIcon}
                            />
                        </View>
                        <Text style={styles.actionText}>Inquiry</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('Notifications')}
                    >
                        <View style={styles.iconContainer}>
                            <Image
                                source={require('../assets/icons/notifications.png')}
                                style={styles.actionIcon}
                            />
                        </View>
                        <Text style={styles.actionText}>Notifications</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomSpace} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        paddingBottom: 73,
        backgroundColor: '#000',
        borderBottomLeftRadius: 17,
        borderBottomRightRadius: 17,
        zIndex: 1,
    },
    greeting: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 40
    },
    locationSignIn: {
        color: '#fff',
        marginTop: 40,
        fontSize: 16,
    },
    signIn: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    bannerContainer: {
        height: 200,
        marginHorizontal: 20,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'absolute',
        top: 125, 
        backgroundColor: '#d4d4d4',
        left: 0,
        right: 0,
        zIndex: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    bannerItemContainer: {
        width: width - 40,
        height: 200,
        borderRadius: 10,
        overflow: 'hidden',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
    },
    paginationDot: {
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
        transition: 'all 0.3s ease',
    },
    content: {
        flex: 1,
        paddingTop: 140,
        paddingHorizontal: 20,
    },
    mainButton: {
        backgroundColor: '#000',
        padding: 16,
        height: 50,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 25,
        marginTop: 58,
    },
    mainButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginTop: -5
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    actionButton: {
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 16,
        width: actionButtonWidth,
        height: actionButtonHeight,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#cccccc',
        shadowOffset: { width: 0, height: 1 },
        elevation: 3,
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    iconContainer: {
        marginBottom: 8,
        height: width * 0.09, // Responsive icon container height
        width: width * 0.09,  // Responsive icon container width
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionIcon: {
        width: width * 0.12,  // Responsive icon size
        height: width * 0.12, // Responsive icon size
        resizeMode: 'contain',
    },
    greetingIcon: {
        width: 23,
        height: 23,
    },
    bookIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginRight: 5,
        marginTop: -5
    },
    actionText: {
        fontSize: width * 0.035, // Responsive font size
        color: '#333',
        fontWeight: '700',
        marginTop: 8,
    },
    bottomSpace: {
        height: 20,
    },
});

export default HomeScreen;