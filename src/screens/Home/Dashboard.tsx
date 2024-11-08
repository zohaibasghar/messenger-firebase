import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import CalendarEvents from "../../components/Calender";
import { SafeAreaView } from "react-native-safe-area-context";
import Today from "../../components/Today";
import Weather from "../../components/Weather";
import LatestMsg from "../../components/LatestMsg";

const Dashboard = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.section}>
          <Today />
          <CalendarEvents />
        </View>
        <View style={styles.section}>
          <Weather />
        </View>
        <View style={styles.section}>
          <LatestMsg />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  section: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    marginHorizontal: 12,
  },
});
