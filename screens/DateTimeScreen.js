import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Platform,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Helper function to get the days of the current month
const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];

    // Get the last few days of the previous month if the month doesn't start on Sunday
    const firstDay = date.getDay();
    if (firstDay > 0) {
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();

        for (let i = firstDay - 1; i >= 0; i--) {
            days.push({
                day: daysInPrevMonth - i,
                month: prevMonth,
                year: prevYear,
                isCurrentMonth: false
            });
        }
    }

    // Add all days of the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        days.push({
            day: i,
            month,
            year,
            isCurrentMonth: true
        });
    }

    // Add days of the next month to complete the last week
    const lastDay = new Date(year, month, daysInMonth).getDay();
    if (lastDay < 6) {
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextYear = month === 11 ? year + 1 : year;

        for (let i = 1; i <= 6 - lastDay; i++) {
            days.push({
                day: i,
                month: nextMonth,
                year: nextYear,
                isCurrentMonth: false
            });
        }
    }

    return days;
};

// Updated time slots data with availability status
const timeSlots = {
    Morning: [
        { id: 1, time: '10:00 AM', available: true },
        { id: 2, time: '10:30 AM', available: false },
        { id: 3, time: '11:00 AM', available: true },
        { id: 4, time: '11:30 AM', available: true },
    ],
    Afternoon: [
        { id: 5, time: '12:00 PM', available: true },
        { id: 6, time: '12:30 PM', available: true },
        { id: 7, time: '1:00 PM', available: true },
        { id: 8, time: '1:30 PM', available: true },
        { id: 9, time: '2:00 PM', available: true },
        { id: 10, time: '2:30 PM', available: true },
        { id: 11, time: '3:00 PM', available: true },
        { id: 12, time: '3:30 PM', available: true },
        { id: 13, time: '4:00 PM', available: true },
        { id: 14, time: '4:30 PM', available: true },
    ],
    Evening: [
        { id: 15, time: '5:00 PM', available: true },
        { id: 16, time: '5:30 PM', available: false },
        { id: 17, time: '6:00 PM', available: false },
        { id: 18, time: '6:30 PM', available: false },
        { id: 19, time: '7:00 PM', available: true },
    ],
};

const DateTimeScreen = ({ navigation, route = {} }) => {
    const { stylistId = 1, branchName = "grow Tokyo BKK", selectedServices = [] } = route.params || {};

    // State for calendar
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(null);
    const [days, setDays] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [stylistName, setStylistName] = useState('Chandeth');
    const [serviceTitle, setServiceTitle] = useState('Color');

    // Calculate days in the month whenever month or year changes
    useEffect(() => {
        setDays(getDaysInMonth(currentYear, currentMonth));
    }, [currentMonth, currentYear]);

    // Set today as the selected date initially
    useEffect(() => {
        const currentDate = new Date();
        if (currentDate.getMonth() === currentMonth && currentDate.getFullYear() === currentYear) {
            setSelectedDate({
                day: currentDate.getDate(),
                month: currentMonth,
                year: currentYear,
                isCurrentMonth: true
            });
        }
    }, [days]);

    // Set stylist name from route params
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

    // Get service title from selected services
    useEffect(() => {
        if (selectedServices && selectedServices.length > 0) {
            // This is a simplified approach - in a real app you'd need to look up the actual service title
            // based on the IDs in selectedServices
            const serviceCategories = [
                {
                    id: 1,
                    name: 'CUT INC SHAMPOO and BLOW DRY',
                    services: [
                        { id: 1, title: 'Cut (For Men)' },
                        { id: 2, title: 'Cut (For Lady)' },
                        { id: 3, title: 'Cut (For Kids under 10 years)' }
                    ]
                },
                {
                    id: 2,
                    name: 'SHAMPOO and BLOW DRY',
                    services: [
                        { id: 4, title: 'Shampoo and Blow Dry' }
                    ]
                },
                {
                    id: 3,
                    name: 'COLOR',
                    services: [
                        { id: 5, title: 'Color' },
                        { id: 6, title: 'Bleach' },
                        { id: 7, title: 'Foil color' }
                    ]
                }
            ];

            // Find the first service title
            for (const category of serviceCategories) {
                for (const service of category.services) {
                    if (selectedServices.includes(service.id)) {
                        setServiceTitle(service.title);
                        return;
                    }
                }
            }
        }
    }, [selectedServices]);

    // Navigation to previous month
    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    // Navigation to next month
    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    // Handle date selection
    const handleDateSelect = (day) => {
        // Only allow selection of current month days and not past days
        const today = new Date();
        const selectedDayDate = new Date(day.year, day.month, day.day);
        if (day.isCurrentMonth && selectedDayDate >= today) {
            setSelectedDate(day);
        }
    };

    // Handle time selection
    const handleTimeSelect = (time) => {
        // Only allow selection of available time slots
        if (time.available) {
            setSelectedTime(time);
        }
    };

    // Handle confirmation
    const handleConfirm = () => {
        if (selectedDate && selectedTime) {
            // Navigate to the next screen or perform booking action
            // alert(`Booking confirmed for ${selectedDate.day}/${selectedDate.month + 1}/${selectedDate.year} at ${selectedTime.time}`);
            // In a real app, you'd navigate to confirmation screen or perform API call
            navigation.navigate('ConfirmBooking', { date: selectedDate, time: selectedTime });
        }
    };

    // Determine if a date is today
    const isToday = (day) => {
        const today = new Date();
        return day.day === today.getDate() &&
            day.month === today.getMonth() &&
            day.year === today.getFullYear();
    };

    // Determine if a day is in the past
    const isPastDay = (day) => {
        const today = new Date();
        const dayDate = new Date(day.year, day.month, day.day);
        return dayDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    };

    // Format month name
    const getMonthName = (month) => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[month];
    };

    // Progress steps data with completion status
    const progressSteps = [
        { id: 1, label: 'Staff', status: 'completed' },
        { id: 2, label: 'Services', status: 'completed' },
        { id: 3, label: 'Date & Time', status: 'active' }
    ];

    // Helper function to determine dot style based on status
    const getProgressDotStyle = (status) => {
        switch (status) {
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
        switch (status) {
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

    // Render weekday headers
    const renderWeekdays = () => {
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return (
            <View style={styles.weekdaysContainer}>
                {weekdays.map((day, index) => (
                    <Text key={index} style={styles.weekdayText}>{day}</Text>
                ))}
            </View>
        );
    };

    // Render calendar days
    const renderDays = () => {
        return (
            <View style={styles.daysContainer}>
                {days.map((day, index) => {
                    const isSelected = selectedDate && selectedDate.day === day.day &&
                        selectedDate.month === day.month &&
                        selectedDate.year === day.year;
                    const isDayInPast = isPastDay(day);
                    const isTodayDate = isToday(day);

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dayButton,
                                !day.isCurrentMonth && styles.otherMonthDay,
                                isSelected && styles.selectedDay,
                                isTodayDate && styles.todayDay,
                                isSelected && isTodayDate && styles.selectedTodayDay,
                                isDayInPast && styles.pastDay
                            ]}
                            onPress={() => handleDateSelect(day)}
                            disabled={!day.isCurrentMonth || isDayInPast}
                        >
                            <Text
                                style={[
                                    styles.dayText,
                                    !day.isCurrentMonth && styles.otherMonthDayText,
                                    isSelected && styles.selectedDayText,
                                    isSelected && styles.selectedDayNumber,
                                    isDayInPast && styles.pastDayText
                                ]}>
                                {day.day}
                            </Text>
                            {day.isCurrentMonth && (
                                <Text
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                    style={[
                                        styles.shopAvailabilityText,
                                        isSelected && styles.selectedDayText,
                                        isDayInPast && styles.pastDayText
                                    ]}>
                                    grow Tokyo BKK
                                </Text>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    // Render time slots with 3 slots per row
    const renderTimeSlots = () => {
        return (
            <View style={styles.timeSlotsContainer}>
                {Object.keys(timeSlots).map((timeOfDay) => (
                    <View key={timeOfDay} style={styles.timeOfDayContainer}>
                        <Text style={styles.timeOfDayText}>{timeOfDay}</Text>
                        <View style={styles.timeButtonsContainer}>
                            {/* Group time slots in rows of 3 */}
                            {chunk(timeSlots[timeOfDay], 3).map((row, rowIndex) => (
                                <View key={rowIndex} style={styles.timeButtonRow}>
                                    {row.map((slot) => (
                                        <TouchableOpacity
                                            key={slot.id}
                                            style={[
                                                styles.timeButton,
                                                !slot.available && styles.unavailableTimeButton,
                                                selectedTime && selectedTime.id === slot.id && styles.selectedTimeButton
                                            ]}
                                            onPress={() => handleTimeSelect(slot)}
                                            disabled={!slot.available}
                                        >
                                            <Text style={[
                                                styles.timeButtonText,
                                                !slot.available && styles.unavailableTimeText,
                                                selectedTime && selectedTime.id === slot.id && styles.selectedTimeText
                                            ]}>
                                                {slot.time}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                    {/* Add empty slots to fill the row if needed */}
                                    {row.length < 3 && Array(3 - row.length).fill().map((_, i) => (
                                        <View key={`empty-${i}`} style={styles.emptySlot} />
                                    ))}
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        );
    };

    // Helper function to split array into chunks
    const chunk = (array, size) => {
        const chunked = [];
        let index = 0;
        while (index < array.length) {
            chunked.push(array.slice(index, index + size));
            index += size;
        }
        return chunked;
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
                                        <Ionicons name="checkmark" size={12} color="#fff" />
                                    )}
                                </View>
                                <Text style={getProgressTextStyle(step.status)}>
                                    {step.label}
                                </Text>
                            </View>
                            {index < progressSteps.length - 1 && (
                                <View style={[
                                    ...getProgressBarStyle(step.status),
                                    { width: width * 0.15 }
                                ]}></View>
                            )}
                        </React.Fragment>
                    ))}
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.calendarHeader}>Date</Text>
                <View style={styles.calendarContainer}>
                    <View style={styles.monthNavigation}>
                        <TouchableOpacity onPress={handlePrevMonth} style={styles.monthNavigationButton}>
                            <Ionicons name="chevron-back" size={24} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.monthYearText}>{getMonthName(currentMonth)} {currentYear}</Text>
                        <TouchableOpacity onPress={handleNextMonth} style={styles.monthNavigationButton}>
                            <Ionicons name="chevron-forward" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>

                    {renderWeekdays()}
                    {renderDays()}
                </View>

                <Text style={styles.timeSlotsHeader}>Available Slots</Text>
                {renderTimeSlots()}
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.footerInfo}>
                    <Text style={styles.footerText}>{stylistName}</Text>
                    <Text style={styles.footerText}>{serviceTitle}</Text>
                </View>
                <TouchableOpacity
                    style={[
                        styles.confirmButton,
                        (!selectedDate || !selectedTime) && styles.disabledButton
                    ]}
                    onPress={handleConfirm}
                    disabled={!selectedDate || !selectedTime}
                >
                    <Text style={styles.confirmButtonText}>Confirm</Text>
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
        paddingHorizontal: width * 0.03,
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
    },
    completedProgressDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#4CAF50',
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeProgressDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#000',
        marginBottom: 5,
    },
    inactiveProgressDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#ccc',
        marginBottom: 5,
    },
    completedProgressText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '500',
    },
    activeProgressText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '500',
    },
    inactiveProgressText: {
        color: '#999',
        fontSize: 14,
    },
    content: {
        flex: 1,
        paddingHorizontal: 15,
    },
    calendarContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginTop: 15,
    },
    calendarHeader: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: -4,
        marginTop: 2
    },
    monthNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    monthNavigationButton: {
        padding: 5,
    },
    monthYearText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    weekdaysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    weekdayText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        width: width / 7 - 10,
    },
    daysContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    dayButton: {
        width: width / 7 - 10,
        aspectRatio: 1,
        justifyContent: 'left',
        paddingHorizontal: 2,
        paddingVertical: 2,
    },
    dayText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
        marginTop: 3    
    },
    shopAvailabilityText: {
        fontSize: 10,
        color: '#666',
        marginTop: 2,
        paddingHorizontal: 2,
        maxWidth: 100
    },
    otherMonthDay: {
        opacity: 0.3,
    },
    otherMonthDayText: {
        color: '#999',
    },
    selectedDay: {
        backgroundColor: '#000',
    },
    selectedDayText: {
        color: '#fff',
    },
    selectedDayNumber: {
        color: 'green',
    },
    todayDay: {
        borderWidth: 1,
        borderColor: '#000',
    },
    selectedTodayDay: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    pastDay: {
        backgroundColor: '#C9C9C9',
    },
    pastDayText: {
        color: '#999',
    },
    timeSlotsContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginTop: 15,
        marginBottom: 20,
    },
    timeSlotsHeader: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginTop: 20,
    },
    timeOfDayContainer: {
        marginBottom: 20,
    },
    timeOfDayText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 10,
    },
    timeButtonsContainer: {
        width: '100%',
    },
    timeButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    timeButton: {
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#333',
        width: (width - 60) / 3,
        alignItems: 'center',
    },
    timeButtonText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    selectedTimeButton: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    selectedTimeText: {
        color: '#fff',
    },
    unavailableTimeButton: {
        backgroundColor: '#f0f0f0',
        borderColor: '#ddd',
    },
    unavailableTimeText: {
        color: '#aaa',
        textDecorationLine: 'line-through',
    },
    emptySlot: {
        width: (width - 60) / 3,
    },
    footer: {
        backgroundColor: '#000',
        padding: 15,
        paddingBottom: Platform.OS === 'ios' ? 30 : 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 80,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    footerInfo: {
        flexDirection: 'column',
    },
    footerText: {
        color: '#fff',
        fontSize: 16,
    },
    confirmButton: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        minWidth: 100,
    },
    confirmButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    disabledButton: {
        opacity: 0.5,
    },
});

export default DateTimeScreen;