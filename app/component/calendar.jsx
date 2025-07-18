import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Generate days for the current month view
  const getDaysInMonth = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
    
    // Get days from previous month that appear in this month's first week
    const firstDayOfWeek = date.getDay();
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        currentMonth: false,
      });
    }
    
    // Get days of current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        currentMonth: true,
      });
    }
    
    // Get days from next month to complete the last week
    const daysToAdd = 42 - days.length;
    for (let i = 1; i <= daysToAdd; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        currentMonth: false,
      });
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());

  // Navigation functions
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Handle add event
  const handleAddEvent = () => {
    // Add your event creation logic here
    console.log('Add new event');
  };

  // Format date for display
  const monthNames = ["January", "February", "March", "April", "May", "June", 
                     "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.calendarHeader}>Calendar</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddEvent}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.monthHeader}>
          <TouchableOpacity onPress={prevMonth}>
            <Text style={styles.navButton}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.monthTitle}>{currentMonthName} {currentYear}</Text>
          <TouchableOpacity onPress={nextMonth}>
            <Text style={styles.navButton}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.weekDays}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <Text key={index} style={styles.weekDay}>{day}</Text>
          ))}
        </View>
        
        <View style={styles.daysContainer}>
          {days.map((day, index) => {
            const isSelected = selectedDate && 
                              day.date.getDate() === selectedDate.getDate() && 
                              day.date.getMonth() === selectedDate.getMonth() && 
                              day.date.getFullYear() === selectedDate.getFullYear();
            
            return (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.dayCell,
                  isSelected && styles.selectedDay,
                  !day.currentMonth && styles.otherMonthDay
                ]}
                onPress={() => setSelectedDate(day.date)}
              >
                <Text style={[
                  styles.dayText,
                  isSelected && styles.selectedDayText,
                  !day.currentMonth && styles.otherMonthDayText
                ]}>
                  {day.date.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    padding: 16,
    marginBottom: 10, // Reduced from 16
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  calendarContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12, // Reduced from 16
  },
  calendarHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffed29',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    lineHeight: 28,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8, // Reduced from 10
    paddingHorizontal: 8,
  },
  navButton: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    color: '#4285F4',
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8, // Reduced from 10
    paddingHorizontal: 8,
  },
  weekDay: {
    width: 40,
    textAlign: 'center',
    fontWeight: '500',
    color: '#666',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  dayCell: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 20,
  },
  dayText: {
    fontSize: 16,
    color: '#333',
  },
  selectedDay: {
    backgroundColor: '#4285F4',
  },
  selectedDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  otherMonthDay: {
    opacity: 0.5,
  },
  otherMonthDayText: {
    color: '#999',
  },
});

export default Calendar;