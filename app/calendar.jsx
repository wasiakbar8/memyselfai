import { useState } from 'react';
import {
    Alert,
    Dimensions,
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CustomDrawer from './component/CustomDrawer'; // Adjust the import path as needed

const { width, height } = Dimensions.get('window');

const SmartCalendar = () => {
  const [activeTab, setActiveTab] = useState('Today');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [eventTypeFilter, setEventTypeFilter] = useState('All');
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Design Team Weekly',
      description: 'Weekly sync to discuss design progress and upcoming tasks',
      date: '2025-07-23',
      startTime: '10:00',
      endTime: '11:00',
      type: 'meeting',
      color: '#10B981',
      attendees: 5,
      progress: 50,
    },
    {
      id: '2',
      title: 'Project Review',
      description: 'Review project milestones and deliverables',
      date: '2025-07-23',
      startTime: '14:00',
      endTime: '15:30',
      type: 'meeting',
      color: '#EF4444',
      attendees: 3,
      progress: 75,
    },
    {
      id: '3',
      title: 'Client Call: Acme Corp',
      description: 'Discuss contract terms and project scope with Acme Corp',
      date: '2025-07-23',
      startTime: '16:00',
      endTime: '17:00',
      type: 'call',
      color: '#F59E0B',
      attendees: 1,
      progress: 20,
    },
  ]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false); // State for drawer visibility
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '',
    endTime: '',
    type: 'meeting',
    color: '#10B981',
    progress: '0',
  });
  const [editEvent, setEditEvent] = useState(null);
  const [formError, setFormError] = useState('');

  const tabs = ['Today', 'Weekly', 'Monthly', 'Yearly'];
  const eventTypes = ['All', 'meeting', 'task', 'call', 'personal'];
  const eventColors = ['#10B981', '#EF4444', '#F59E0B', '#3B82F6'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const getTodayEvents = () => {
    const today = new Date().toISOString().split('T')[0];
    return events
      .filter(event => event.date === today && (eventTypeFilter === 'All' || event.type === eventTypeFilter))
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const getEventsForDate = (date) => {
    return events
      .filter(event => event.date === date && (eventTypeFilter === 'All' || event.type === eventTypeFilter))
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const getEventsForMonth = (month, year) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === month && 
             eventDate.getFullYear() === year && 
             (eventTypeFilter === 'All' || event.type === eventTypeFilter);
    });
  };

  const getEventsForWeek = (startDate) => {
    const startOfWeek = new Date(startDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= startOfWeek && 
             eventDate <= endOfWeek && 
             (eventTypeFilter === 'All' || event.type === eventTypeFilter);
    });
  };

  const formatTime = (time) => {
    if (!time) return 'Select time';
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHour = hours % 12 || 12;
    return `${formattedHour}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const addEvent = () => {
    if (!newEvent.title.trim() || !newEvent.date || !newEvent.startTime || !newEvent.endTime) {
      setFormError('Please fill in all required fields');
      return;
    }

    const [startHour, startMinute] = newEvent.startTime.split(':').map(Number);
    const [endHour, endMinute] = newEvent.endTime.split(':').map(Number);
    if (isNaN(startHour) || isNaN(startMinute) || isNaN(endHour) || isNaN(endMinute) ||
        startHour < 0 || startHour > 23 || startMinute < 0 || startMinute > 59 ||
        endHour < 0 || endHour > 23 || endMinute < 0 || endMinute > 59) {
      setFormError('Invalid time format. Use HH:MM (0-23:00-59)');
      return;
    }

    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;
    if (endTimeInMinutes <= startTimeInMinutes) {
      setFormError('End time must be after start time');
      return;
    }

    const progressNum = parseInt(newEvent.progress);
    if (isNaN(progressNum) || progressNum < 0 || progressNum > 100) {
      setFormError('Progress must be a number between 0 and 100');
      return;
    }

    const event = {
      id: Date.now().toString(),
      ...newEvent,
      progress: progressNum,
      attendees: Math.floor(Math.random() * 5) + 1,
    };

    setEvents(prevEvents => [...prevEvents, event]);
    setNewEvent({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      startTime: '',
      endTime: '',
      type: 'meeting',
      color: '#10B981',
      progress: '0',
    });
    setFormError('');
    setShowAddEventModal(false);
  };

  const updateEventProgress = () => {
    if (!editEvent?.title || !editEvent?.date || !editEvent?.startTime || !editEvent?.endTime) {
      setFormError('Event data is incomplete');
      return;
    }

    const progressNum = parseInt(editEvent.progress);
    if (isNaN(progressNum) || progressNum < 0 || progressNum > 100) {
      setFormError('Progress must be a number between 0 and 100');
      return;
    }

    setEvents(events.map(event => 
      event.id === editEvent.id ? { ...editEvent, progress: progressNum } : event
    ));
    setFormError('');
    setShowEditEventModal(false);
    setEditEvent(null);
  };

  const deleteEvent = (eventId) => {
    const eventToDelete = events.find(event => event.id === eventId);
    if (!eventToDelete) {
      Alert.alert('Error', `Event with ID ${eventId} not found`);
      return;
    }

    Alert.alert(
      'Delete Event',
      `Are you sure you want to delete "${eventToDelete.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
            if (showEditEventModal) {
              setShowEditEventModal(false);
              setEditEvent(null);
            }
            Alert.alert('Success', 'Event deleted successfully');
          },
        },
      ],
      { cancelable: true }
    );
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const calculateProgress = (events) => {
    if (events.length === 0) return 0;
    const totalProgress = events.reduce((sum, event) => sum + event.progress, 0);
    return Math.round(totalProgress / events.length);
  };

  const renderCalendarGrid = (month = currentMonth, year = currentYear, compact = false) => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const today = new Date();
    const isCurrentMonth = month === today.getMonth() && year === today.getFullYear();
    const todayDate = today.getDate();

    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push({ key: `empty-${i}`, content: null });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = getEventsForDate(dateString);
      const isToday = isCurrentMonth && day === todayDate;
      const isSelected = selectedDate === dateString;

      days.push({
        key: `day-${day}`,
        content: (
          <TouchableOpacity
            style={[
              styles.dayCell,
              isToday && styles.todayCell,
              isSelected && styles.selectedCell,
            ]}
            onPress={() => setSelectedDate(dateString)}
          >
            <Text style={[styles.dayText, isToday && styles.todayText, isSelected && styles.selectedText]}>
              {day}
            </Text>
            {dayEvents.length > 0 && (
              <View style={styles.eventDots}>
                {dayEvents.slice(0, 3).map((event, index) => (
                  <View
                    key={index}
                    style={[styles.eventDot, { backgroundColor: event.color }]}
                  />
                ))}
              </View>
            )}
          </TouchableOpacity>
        ),
      });
    }

    return days;
  };

  const renderEventItem = (event, showDelete = true) => (
    <TouchableOpacity
      onPress={() => {
        setEditEvent({ ...event, progress: event.progress.toString() });
        setShowEditEventModal(true);
        setFormError('');
      }}
      style={[styles.eventCard, { borderLeftColor: event.color }]}
      activeOpacity={0.7}
    >
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDescription}>{event.description}</Text>
        <View style={styles.eventInfo}>
          <Icon name="clock" size={14} color="#4B5563" />
          <Text style={styles.eventText}>
            {formatTime(event.startTime)} - {formatTime(event.endTime)}
          </Text>
        </View>
        <View style={styles.eventInfo}>
          <Icon name="users" size={14} color="#4B5563" />
          <Text style={styles.eventText}>{event.attendees} attendees</Text>
        </View>
        <View style={styles.eventInfo}>
          <Icon name="percent" size={14} color="#4B5563" />
          <Text style={styles.eventText}>{event.progress}% Complete</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${event.progress}%`, backgroundColor: event.color }]} />
        </View>
      </View>
      {showDelete && (
        <TouchableOpacity
          onPress={() => deleteEvent(event.id)}
          style={[styles.deleteButton, { padding: 12, zIndex: 10 }]}
          activeOpacity={0.7}
          testID={`delete-button-${event.id}`}
        >
          <Icon name="trash-2" size={20} color="#EF4444" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  const renderFilterButtons = () => (
    <View style={styles.filterContainer}>
      {eventTypes.map(type => (
        <TouchableOpacity
          key={type}
          onPress={() => setEventTypeFilter(type)}
          style={[styles.filterButton, eventTypeFilter === type && styles.activeFilterButton]}
        >
          <Text style={[styles.filterButtonText, eventTypeFilter === type && styles.activeFilterButtonText]}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderTodayView = () => {
    const todayEvents = getTodayEvents();
    const progress = calculateProgress(todayEvents);
    return (
      <ScrollView style={styles.viewContainer}>
        <View style={styles.header}>
          <Text style={styles.viewTitle}>Today's Plans</Text>
          <Text style={styles.viewSubtitle}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          <Text style={styles.progressSummary}>Daily Progress: {progress}%</Text>
        </View>

        {renderFilterButtons()}

        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarTitle}>
              {months[currentMonth]} {currentYear}
            </Text>
            <View style={styles.navButtons}>
              <TouchableOpacity
                onPress={() => {
                  if (currentMonth === 0) {
                    setCurrentMonth(11);
                    setCurrentYear(currentYear - 1);
                  } else {
                    setCurrentMonth(currentMonth - 1);
                  }
                }}
                style={styles.navButton}
              >
                <Icon name="chevron-left" size={16} color="#4B5563" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (currentMonth === 11) {
                    setCurrentMonth(0);
                    setCurrentYear(currentYear + 1);
                  } else {
                    setCurrentMonth(currentMonth + 1);
                  }
                }}
                style={styles.navButton}
              >
                <Icon name="chevron-right" size={16} color="#4B5563" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.daysOfWeek}>
            {daysOfWeek.map((day, index) => (
              <Text key={`day-of-week-${index}`} style={styles.dayOfWeek}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {renderCalendarGrid().map(day => (
              <View key={day.key} style={styles.dayCellContainer}>
                {day.content}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Today's Events</Text>
          {todayEvents.length > 0 ? (
            todayEvents.map(event => renderEventItem(event))
          ) : (
            <Text style={styles.noEvents}>No events for today</Text>
          )}
        </View>
      </ScrollView>
    );
  };

  const renderWeeklyView = () => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }
    const weekEvents = getEventsForWeek(startOfWeek);
    const progress = calculateProgress(weekEvents);

    return (
      <ScrollView style={styles.viewContainer}>
        <View style={styles.header}>
          <Text style={styles.viewTitle}>Weekly Calendar</Text>
          <Text style={styles.viewSubtitle}>
            Week of {weekDays[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} -{' '}
            {weekDays[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </Text>
          <Text style={styles.progressSummary}>Weekly Progress: {progress}%</Text>
        </View>

        {renderFilterButtons()}

        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarTitle}>
              {months[currentMonth]} {currentYear}
            </Text>
            <View style={styles.navButtons}>
              <TouchableOpacity
                onPress={() => {
                  if (currentMonth === 0) {
                    setCurrentMonth(11);
                    setCurrentYear(currentYear - 1);
                  } else {
                    setCurrentMonth(currentMonth - 1);
                  }
                }}
                style={styles.navButton}
              >
                <Icon name="chevron-left" size={16} color="#4B5563" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (currentMonth === 11) {
                    setCurrentMonth(0);
                    setCurrentYear(currentYear + 1);
                  } else {
                    setCurrentMonth(currentMonth + 1);
                  }
                }}
                style={styles.navButton}
              >
                <Icon name="chevron-right" size={16} color="#4B5563" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.daysOfWeek}>
            {daysOfWeek.map((day, index) => (
              <Text key={`day-of-week-${index}`} style={styles.dayOfWeek}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {renderCalendarGrid().map(day => (
              <View key={day.key} style={styles.dayCellContainer}>
                {day.content}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Weekly Schedule</Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, { width: 60 }]}>Time</Text>
              {weekDays.map((day, index) => (
                <Text key={index} style={[styles.tableHeaderText, { flex: 1, textAlign: 'center' }]}>
                  {day.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}
                </Text>
              ))}
            </View>
            {Array.from({ length: 12 }, (_, hour) => (
              <View key={hour} style={styles.tableRow}>
                <Text style={[styles.tableCell, { width: 60 }]}>
                  {String(hour + 8).padStart(2, '0')}:00
                </Text>
                {weekDays.map((day, dayIndex) => {
                  const dateString = day.toISOString().split('T')[0];
                  const dayEvents = getEventsForDate(dateString).filter(event => {
                    const eventHour = parseInt(event.startTime.split(':')[0]);
                    return eventHour === hour + 8;
                  });
                  return (
                    <View key={dayIndex} style={[styles.tableCell, { flex: 1 }]}>
                      {dayEvents.map(event => (
                        <View
                          key={event.id}
                          style={[styles.eventTag, { backgroundColor: event.color }]}
                        >
                          <Text style={styles.eventTagText}>{event.title} ({event.progress}%)</Text>
                        </View>
                      ))}
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  };

  const renderMonthlyView = () => {
    const monthEvents = getEventsForMonth(currentMonth, currentYear);
    const progress = calculateProgress(monthEvents);
    return (
      <ScrollView style={styles.viewContainer}>
        <View style={styles.header}>
          <Text style={styles.viewTitle}>Monthly View</Text>
          <Text style={styles.viewSubtitle}>
            {months[currentMonth]} {currentYear}
          </Text>
          <Text style={styles.progressSummary}>Monthly Progress: {progress}%</Text>
        </View>

        {renderFilterButtons()}

        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarTitle}>
              {months[currentMonth]} {currentYear}
            </Text>
            <View style={styles.navButtons}>
              <TouchableOpacity
                onPress={() => {
                  if (currentMonth === 0) {
                    setCurrentMonth(11);
                    setCurrentYear(currentYear - 1);
                  } else {
                    setCurrentMonth(currentMonth - 1);
                  }
                }}
                style={styles.navButton}
              >
                <Icon name="chevron-left" size={16} color="#4B5563" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (currentMonth === 11) {
                    setCurrentMonth(0);
                    setCurrentYear(currentYear + 1);
                  } else {
                    setCurrentMonth(currentMonth + 1);
                  }
                }}
                style={styles.navButton}
              >
                <Icon name="chevron-right" size={16} color="#4B5563" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.daysOfWeek}>
            {daysOfWeek.map((day, index) => (
              <Text key={`day-of-week-${index}`} style={styles.dayOfWeek}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {renderCalendarGrid().map(day => (
              <View key={day.key} style={styles.dayCellContainer}>
                {day.content}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>{months[currentMonth]} Events</Text>
          {monthEvents.length > 0 ? (
            monthEvents.map(event => renderEventItem(event))
          ) : (
            <Text style={styles.noEvents}>No events this month</Text>
          )}
        </View>
      </ScrollView>
    );
  };

  const renderYearlyView = () => {
    const yearlyProgress = months.map((_, index) => {
      const monthEvents = getEventsForMonth(index, currentYear);
      return calculateProgress(monthEvents);
    });
    const averageYearlyProgress = yearlyProgress.length > 0 ? Math.round(yearlyProgress.reduce((sum, p) => sum + p, 0) / 12) : 0;

    return (
      <ScrollView style={[styles.viewContainer, { height: height * 0.8 }]}>
        <View style={styles.header}>
          <Text style={styles.viewTitle}>Yearly View</Text>
          <Text style={styles.viewSubtitle}>{currentYear}</Text>
          <Text style={styles.progressSummary}>Yearly Progress: {averageYearlyProgress}%</Text>
        </View>

        <View style={[styles.monthGrid, { width: width - 32 }]}>
          {months.map((month, index) => {
            const monthEvents = getEventsForMonth(index, currentYear);
            const progress = calculateProgress(monthEvents);
            return (
              <View key={month} style={[styles.monthCard, { width: (width - 48) / 2 }]}>
                <View style={styles.monthHeader}>
                  <Text style={styles.monthTitle}>{month}</Text>
                  <Text style={styles.eventCount}>{monthEvents.length} events ({progress}%)</Text>
                </View>
                <View style={styles.daysOfWeek}>
                  {daysOfWeek.map((day, dayIndex) => (
                    <Text key={`day-of-week-${currentYear}-${index}-${dayIndex}`} style={styles.dayOfWeekSmall}>
                      {day}
                    </Text>
                  ))}
                </View>
                <View style={styles.calendarGridSmall}>
                  {renderCalendarGrid(index, currentYear, true).map(day => (
                    <View key={day.key} style={styles.dayCellContainerSmall}>
                      {day.content}
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Today':
        return renderTodayView();
      case 'Weekly':
        return renderWeeklyView();
      case 'Monthly':
        return renderMonthlyView();
      case 'Yearly':
        return renderYearlyView();
      default:
        return renderTodayView();
    }
  };

  const handleHamburgerPress = () => {
    setShowDrawer(true); // Open the drawer
  };

  const handleNotificationPress = () => {
    Alert.alert('Notifications', 'No new notifications');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleHamburgerPress}>
          <Icon name="menu" size={24} color="#4B5563" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendar</Text>
        <TouchableOpacity onPress={handleNotificationPress}>
          <Icon name="bell" size={24} color="#4B5563" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.content}>
        {renderActiveTab()}
      </View>

      <TouchableOpacity
        onPress={() => {
          setShowAddEventModal(true);
          setFormError('');
        }}
        style={styles.fab}
      >
        <Icon name="plus" size={24} color="#000" />
      </TouchableOpacity>

      <CustomDrawer
        isVisible={showDrawer}
        onClose={() => setShowDrawer(false)}
        activeScreen="calendar"
      />

      <Modal
        visible={showAddEventModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setShowAddEventModal(false);
          setFormError('');
          setNewEvent({
            title: '',
            description: '',
            date: new Date().toISOString().split('T')[0],
            startTime: '',
            endTime: '',
            type: 'meeting',
            color: '#10B981',
            progress: '0',
          });
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Event</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowAddEventModal(false);
                  setFormError('');
                  setNewEvent({
                    title: '',
                    description: '',
                    date: new Date().toISOString().split('T')[0],
                    startTime: '',
                    endTime: '',
                    type: 'meeting',
                    color: '#10B981',
                    progress: '0',
                  });
                }}
              >
                <Icon name="x" size={24} color="#4B5563" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {formError ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{formError}</Text>
                </View>
              ) : null}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Event Title *</Text>
                <TextInput
                  style={styles.input}
                  value={newEvent.title}
                  onChangeText={text => setNewEvent({ ...newEvent, title: text })}
                  placeholder="Enter event title"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.descriptionInput]}
                  value={newEvent.description}
                  onChangeText={text => setNewEvent({ ...newEvent, description: text })}
                  placeholder="Enter event description"
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={4}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Date *</Text>
                <TextInput
                  style={styles.input}
                  value={newEvent.date}
                  onChangeText={text => setNewEvent({ ...newEvent, date: text })}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.timeInputs}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Start Time *</Text>
                  <TextInput
                    style={styles.input}
                    value={newEvent.startTime}
                    onChangeText={text => setNewEvent({ ...newEvent, startTime: text })}
                    placeholder="HH:MM"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>End Time *</Text>
                  <TextInput
                    style={styles.input}
                    value={newEvent.endTime}
                    onChangeText={text => setNewEvent({ ...newEvent, endTime: text })}
                    placeholder="HH:MM"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Progress (%)</Text>
                <TextInput
                  style={styles.input}
                  value={newEvent.progress}
                  onChangeText={text => setNewEvent({ ...newEvent, progress: text })}
                  placeholder="0-100"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Event Type</Text>
                <View style={styles.typeButtons}>
                  {eventTypes.slice(1).map(type => (
                    <TouchableOpacity
                      key={type}
                      onPress={() => setNewEvent({ ...newEvent, type })}
                      style={[styles.typeButton, newEvent.type === type && styles.activeTypeButton]}
                    >
                      <Text style={[styles.typeButtonText, newEvent.type === type && styles.activeTypeButtonText]}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Color</Text>
                <View style={styles.colorButtons}>
                  {eventColors.map(color => (
                    <TouchableOpacity
                      key={color}
                      onPress={() => setNewEvent({ ...newEvent, color })}
                      style={[styles.colorButton, { backgroundColor: color }, newEvent.color === color && styles.activeColorButton]}
                    />
                  ))}
                </View>
              </View>

              <TouchableOpacity onPress={addEvent} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add Event</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showEditEventModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setShowEditEventModal(false);
          setFormError('');
          setEditEvent(null);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Event Progress</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowEditEventModal(false);
                  setFormError('');
                  setEditEvent(null);
                }}
              >
                <Icon name="x" size={24} color="#4B5563" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {formError ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{formError}</Text>
                </View>
              ) : null}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Event Title</Text>
                <TextInput
                  style={styles.input}
                  value={editEvent?.title}
                  editable={false}
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.descriptionInput]}
                  value={editEvent?.description}
                  editable={false}
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={4}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Progress (%)</Text>
                <TextInput
                  style={styles.input}
                  value={editEvent?.progress}
                  onChangeText={text => setEditEvent({ ...editEvent, progress: text })}
                  placeholder="0-100"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>

              <TouchableOpacity onPress={updateEventProgress} style={styles.addButton}>
                <Text style={styles.addButtonText}>Update Progress</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#F3F4F6',
  },
  activeTab: {
    backgroundColor: '#FBBF24',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  activeTabText: {
    color: '#000',
  },
  content: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  viewTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  viewSubtitle: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 8,
  },
  progressSummary: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
    marginBottom: 8,
  },
  activeFilterButton: {
    backgroundColor: '#3B82F6',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#4B5563',
  },
  activeFilterButtonText: {
    color: '#FFF',
  },
  calendarCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  navButtons: {
    flexDirection: 'row',
  },
  navButton: {
    padding: 4,
  },
  daysOfWeek: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayOfWeek: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  dayOfWeekSmall: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    color: '#6B7280',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarGridSmall: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCellContainer: {
    width: width / 7 - 8,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCellContainerSmall: {
    width: ((width - 48) / 2) / 7 - 4,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCell: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  todayCell: {
    backgroundColor: '#3B82F6',
  },
  selectedCell: {
    backgroundColor: '#FBBF24',
  },
  dayText: {
    fontSize: 12,
    color: '#111827',
  },
  todayText: {
    color: '#FFF',
  },
  selectedText: {
    color: '#000',
  },
  eventDots: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 2,
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 1,
  },
  eventsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventText: {
    fontSize: 12,
    color: '#4B5563',
    marginLeft: 4,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  deleteButton: {
    padding: 12,
    zIndex: 10,
  },
  noEvents: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    paddingVertical: 32,
  },
  tableContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableCell: {
    padding: 4,
    fontSize: 12,
    color: '#4B5563',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventTag: {
    padding: 4,
    borderRadius: 4,
    margin: 2,
  },
  eventTagText: {
    fontSize: 10,
    color: '#FFF',
    textAlign: 'center',
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  monthCard: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  monthTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  eventCount: {
    fontSize: 12,
    color: '#6B7280',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FBBF24',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  modalBody: {
    padding: 16,
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 14,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  timeInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    marginRight: 8,
    marginBottom: 8,
  },
  activeTypeButton: {
    backgroundColor: '#FBBF24',
  },
  typeButtonText: {
    fontSize: 14,
    color: '#4B5563',
  },
  activeTypeButtonText: {
    color: '#000',
  },
  colorButtons: {
    flexDirection: 'row',
  },
  colorButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  activeColorButton: {
    borderWidth: 2,
    borderColor: '#1F2937',
  },
  addButton: {
    backgroundColor: '#FBBF24',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default SmartCalendar;