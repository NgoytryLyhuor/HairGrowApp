import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import ShopScreen from './screens/ShopScreen';
import UserScreen from './screens/UserScreen';
import ProductScreen from './screens/ProductScreen';
import InquiryScreen from './screens/InquiryScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import LoginScreen from './screens/LoginScreen';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Custom modal animation for centered pop-up effect
const modalAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            scale: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 1],
            }),
          },
        ],
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        }),
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.6],
        }),
      },
    };
  },
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 300,
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 300,
      },
    },
  },
};

// Custom tab bar label component for a cleaner look
const TabBarLabel = ({ label, focused }) => (
  <Text style={{
    fontSize: 12,
    color: '#000',
    marginTop: 2
  }}>
    {label}
  </Text>
);

// Main app stack with bottom tabs
function MainStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return (
              <View style={focused ? styles.activeTabIconContainer : null}>
                <Image
                  source={focused
                    ? require('./assets/icons/ic_selected_home.png')
                    : require('./assets/icons/ic_unselected_home.png')}
                  style={styles.icon}
                />
              </View>
            );
          } else if (route.name === 'My Booking') {
            return (
              <Image
                source={focused
                  ? require('./assets/icons/ic_selected_booking.png')
                  : require('./assets/icons/ic_unselected_booking.png')}
                style={styles.icon}
              />
            );
          } else if (route.name === 'Shop') {
            return (
              <Image
                source={focused
                  ? require('./assets/icons/ic_selected_shop.png')
                  : require('./assets/icons/ic_unselected_shop.png')}
                style={styles.icon}
              />
            );
          } else if (route.name === 'User') {
            return (
              <Image
                source={focused
                  ? require('./assets/icons/ic_selected_profile.png')
                  : require('./assets/icons/ic_unselected_profile.png')}
                style={styles.icon}
              />
            );
          }
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 80,
          paddingBottom: 5,
          paddingTop: 10,
          backgroundColor: '#E6E6E6',
        },
        tabBarLabel: ({ focused }) => {
          return <TabBarLabel focused={focused} label={route.name} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="My Booking" component={BookingScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
          elevation: 0, // for Android
          shadowOpacity: 0, // for iOS
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '500',
        },
        // Apply the modal animation to all screens
        ...modalAnimation
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Book Appointment"
        component={BookingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Points"
        component={ProductScreen}
        options={{
          title: 'Your Points',
        }}
      />
      <Stack.Screen
        name="Referral"
        component={ProductScreen}
        options={{
          title: 'Refer a Friend',
        }}
      />
      <Stack.Screen
        name="Coupon"
        component={ProductScreen}
        options={{
          title: 'Available Coupons',
        }}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{
          title: 'Our Products',
        }}
      />
      <Stack.Screen
        name="Inquiry"
        component={InquiryScreen}
        options={{
          title: 'Contact Us',
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: 'Your Notifications',
        }}
      />
    </Stack.Navigator>
  );
}

// Separate stack for login screen to hide bottom tabs
function AuthStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        // Apply the modal animation to auth screens
        ...modalAnimation
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* Add other auth screens like SignUp here */}
    </Stack.Navigator>
  );
}

function BookingStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        // Apply the modal animation to auth screens
        ...modalAnimation
      }}
    >
      <Stack.Screen name="Booking" component={BookingScreen} />
      {/* Add other auth screens like SignUp here */}
    </Stack.Navigator>
  );
}

// Root navigator to handle both main stack and auth screens
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          // Apply the modal animation to root navigator
          ...modalAnimation
        }}
      >
        <Stack.Screen name="Main" component={MainStack} />
        <Stack.Screen 
          name="Auth" 
          component={AuthStack} 
          options={{
            presentation: 'transparentModal',
            animationEnabled: true
          }}
        />
        <Stack.Screen 
          name="Booking" 
          component={BookingStack} 
          options={{
            presentation: 'transparentModal',
            animationEnabled: true
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  activeTabIconContainer: {
    backgroundColor: '#C9C9C9',
    paddingHorizontal: 20,
    paddingVertical: 0,
    borderRadius: 50,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginTop: 5,
    marginBottom: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  }
});