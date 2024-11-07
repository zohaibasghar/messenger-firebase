import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  customInput: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#a1a1a1",
    marginBottom: 4,
  },
  screen: {
    padding: 12,
  },
  hStack: {
    flexDirection: "row",
    gap: 8,
  },
  vStack: {
    flexDirection: "column",
    gap: 8,
  },
  error: {
    color: "red",
    width: "80%",
    textAlign: "center",
    marginHorizontal: "auto",
  },
});
