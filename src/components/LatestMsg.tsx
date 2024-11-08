import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyles } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { useAppSelector } from "../store/store";

const LatestMsg = () => {
  const { navigate }: any = useNavigation();
  const { user } = useAppSelector((state) => state.user);
  const [latestMsg, setLatestMsg] = useState<any>(null);
  useEffect(() => {
    const unsubscribe = firestore()
      .collection("latestMsg")
      .doc(user?.uid)
      .onSnapshot(
        (documentSnapshot) => {
          if (documentSnapshot.exists) {
            const msg = documentSnapshot.data();
            setLatestMsg(msg);
            console.log("Latest Message:", msg);
          } else {
            console.log("No latest message found.");
          }
        },
        (error) => {
          console.error("Error fetching latest message:", error);
        }
      );

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      {latestMsg ? (
        <Pressable onPress={() => navigate("Chat", { id: latestMsg?.sendBy })}>
          <Text style={styles.title}>{latestMsg?.receivedBy}</Text>
          <Text>{latestMsg?.text}</Text>
        </Pressable>
      ) : (
        <Text>No Message received</Text>
      )}
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
