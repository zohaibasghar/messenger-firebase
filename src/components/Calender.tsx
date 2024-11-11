import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Calendar from "expo-calendar";
import { AntDesign } from "@expo/vector-icons";

const CalendarEvents = () => {
  const [events, setEvents] = useState<Calendar.Event[]>([]);

  const requestCalendarPermissions = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    return status === "granted";
  };

  const fetchEvents = async () => {
    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );

    if (calendars.length > 0) {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + 7);

      let allEvents: Calendar.Event[] = [];
      for (const calendar of calendars) {
        const events = await Calendar.getEventsAsync(
          [calendar.id],
          startDate,
          endDate
        );
        allEvents = [...allEvents, ...events];
      }

      setEvents(allEvents);
    }
  };

  const loadCalendarEvents = async () => {
    const hasPermission = await requestCalendarPermissions();
    if (hasPermission) {
      await fetchEvents();
    } else {
      console.log("Calendar permission not granted");
    }
  };

  useEffect(() => {
    loadCalendarEvents();
  }, []);

  return (
    <View>
      {events.length === 0 ? (
        <Text style={{ textAlign: "center", color: "red" }}>
          No upcoming events found
        </Text>
      ) : (
        <View style={styles.eventItem}>
          <AntDesign name="calendar" size={32} color="#777" />
          <View>
            <Text>
              {new Date(events[0].startDate).toLocaleDateString("en-US", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>

            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {events[0].title.toUpperCase()}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default CalendarEvents;

const styles = StyleSheet.create({
  eventItem: {
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
});
