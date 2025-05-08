import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import ShopScreen from './screens/ShopScreen';
import UserScreen from './screens/UserScreen';
import ProductScreen from './screens/ProductScreen';
import InquiryScreen from './screens/InquiryScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Custom tab bar label component for a cleaner look
const TabBarLabel = ({ label, focused }) => (
  <Text style={{ 
    fontSize: 12, 
    color: focused ? '#000' : '#999',
    marginTop: 2
  }}>
    {label}
  </Text>
);

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
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Book Appointment" 
        component={BookingScreen}
        options={{
          title: 'Book Your Appointment',
          headerBackTitle: 'Back'
        }} 
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

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
              return <View style={focused ? styles.activeTabIconContainer : null}>
                <Ionicons name={iconName} size={24} color={color} />
              </View>;
            } else if (route.name === 'My Booking') {
              iconName = focused ? 'calendar' : 'calendar-outline';
              return <Ionicons name={iconName} size={24} color={color} />;
            } else if (route.name === 'Shop') {
              iconName = focused ? 'bag' : 'bag-outline';
              return <Ionicons name={iconName} size={24} color={color} />;
            } else if (route.name === 'User') {
              iconName = focused ? 'person' : 'person-outline';
              return <Ionicons name={iconName} size={24} color={color} />;
            }
          },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            height: 60,
            paddingBottom: 5,
            paddingTop: 5,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
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
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  activeTabIconContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    padding: 6,
  }
});