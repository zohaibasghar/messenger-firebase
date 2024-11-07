import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AppButton from "../../components/AppButton";
import { useNavigation } from "@react-navigation/native";

const AuthHome = () => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.flex}>
      <Text style={styles.title}>Welcome to Messenger</Text>
      <AppButton title="Login" onPress={() => navigate("Login" as never)} />
      <AppButton title="Signup" onPress={() => navigate("Signup" as never)} />
    </View>
  );
};

export default AuthHome;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 24,
    gap: 24,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
});
