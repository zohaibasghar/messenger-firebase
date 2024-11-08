import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../../styles";
import { useNavigation } from "@react-navigation/native";

const LatestMsg = () => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Name</Text>
        <Text>This is contacts message. Main inko btaunga</Text>
      </View>
      <Pressable onPress={() => navigate("Inbox" as never)}>
        <Text style={[globalStyles.link, { textAlign: "right" }]}>
          View inbox
        </Text>
      </Pressable>
    </View>
  );
};

export default LatestMsg;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
});
