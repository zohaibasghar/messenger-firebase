import { StyleSheet, Text, View } from "react-native";
import React from "react";

const today = new Date();

const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

let hours = today.getHours();
const minutes = today.getMinutes();
const ampm = hours >= 12 ? "PM" : "AM";

hours = hours % 12 || 12;

const formattedDate = `${String(day).padStart(2, "0")} - ${String(
  month
).padStart(2, "0")} - ${year}`;
const formattedTime = `${String(hours).padStart(2, "0")}:${String(
  minutes
).padStart(2, "0")} ${ampm.toLowerCase()}`;

const Today = () => {
  return (
    <View>
      <Text style={{ textAlign: "center", fontSize: 22, fontWeight: "600" }}>
        {formattedTime}
      </Text>
      <Text
        style={{ textAlign: "center", fontWeight: "600", marginBottom: 12 }}
      >
        {formattedDate}
      </Text>
    </View>
  );
};

export default Today;

const styles = StyleSheet.create({});
