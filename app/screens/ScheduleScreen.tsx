import React from "react";
import { Text, StyleSheet } from "react-native";
import { GetTrolleyAvailability } from "../services/TrolleyAvailabilityService";

export function ScheduleScreen() {
  return (
    <>
      <Text style={styles.header}>Trolley Schedule</Text>
      {GetTrolleyAvailability().map((x) => (
        <Text key={x.day} style={styles.lineItem}>
          {x.nameOfDay}: {x.startTime} - {x.endTime}
        </Text>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
    margin: 5,
  },
  lineItem: {
      margin:5,
      marginLeft:10
  },
});
