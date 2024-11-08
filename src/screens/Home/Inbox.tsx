import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useAppSelector } from "../../store/store";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../../../styles";
import { Feather } from "@expo/vector-icons";

export default function Inbox() {
  const [users, setUsers] = useState<any[]>([]);
  const { user } = useAppSelector((state) => state.user);
  const { navigate } = useNavigation<any>();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("users")
      .where("email", "!=", user?.email)
      .onSnapshot(
        (querySnapshot) => {
          console.log(querySnapshot.docs[0].data());
          const usersData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          setUsers(usersData);
        },
        (error) => {
          console.error("Error fetching users:", error);
        }
      );

    return () => unsubscribe();
  }, [user?.email]);

  const filtered = useMemo(() => {
    return users.filter((user) => {
      return user.email.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, users]);

  return (
    <View style={{ flex: 1, margin: 12 }}>
      <TextInput
        style={[globalStyles.customInput, { marginBottom: 24 }]}
        placeholder="Search users by email"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.uid}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 8 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigate("Chat", { id: item.uid })}
            style={styles.box}
          >
            <View
              style={[
                globalStyles.hStack,
                { width: "100%", justifyContent: "space-between" },
              ]}
            >
              <Text>{item.email}</Text>
              <Feather name="mail" size={24} color="black" />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: "#a1a1a1",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
});
