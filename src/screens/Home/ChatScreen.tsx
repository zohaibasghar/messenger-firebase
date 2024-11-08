import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import firestore from "@react-native-firebase/firestore";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useAppSelector } from "../../store/store";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";

export default function ChatScreen() {
  const [messages, setMessages] = useState<any[]>([]);
  const router: any = useRoute();
  const { user } = useAppSelector((state) => state.user);
  console.log(messages);
  useEffect(() => {
    const subscriber = firestore()
      .collection("chats")
      .doc(router.params.id + user?.uid)
      .collection("messages")
      .orderBy("createdAt", "desc");
    const unsub = subscriber.onSnapshot((snap) => {
      const allMsgs = snap.docs.map((msg) => {
        const date = msg.data().createdAt;
        return {
          ...msg.data(),
          createdAt: new Date(date.seconds * 1000 + date.nanoseconds / 1000000),
        };
      });
      setMessages(allMsgs);
    });
    return () => unsub();
  }, [user?.uid, router.params?.id]);

  const onSend = useCallback(
    (newMessages: any = []) => {
      const msg = newMessages[0];
      const newMsg = {
        ...msg,
        sendBy: user?.uid,
        createdAt: new Date(),
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMsg)
      );

      firestore()
        .collection("chats")
        .doc(router.params?.id + user?.uid)
        .collection("messages")
        .add(newMsg);

      firestore()
        .collection("chats")
        .doc(user?.uid + router.params.id)
        .collection("messages")
        .add(newMsg);

      firestore()
        .collection("latestMsg")
        .doc(router.params.id)
        .set({ receivedBy: user?.email, text: newMsg.text, sendBy: user?.uid });
    },
    [user?.uid, router.params?.id]
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: user?.uid as string,
        }}
        renderChatEmpty={() => (
          <View style={styles.emptyChatContainer}>
            <Text style={styles.emptyChatText}>
              Send a message to start a chat
            </Text>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  emptyChatContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  emptyChatText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    transform: [{ rotate: "180deg" }],
  },
});
