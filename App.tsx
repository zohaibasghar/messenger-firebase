import "react-native-gesture-handler";
import firebase from "@react-native-firebase/app";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./src/Main";
import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";

export default function App() {
  useEffect(() => {
    (async () => {
      await messaging().registerDeviceForRemoteMessages();
      if (!firebase.apps.length) {
        await firebase.initializeApp({
          projectId: "messengerapp-13293",
          appId: "1:42456107056:android:cc823a89eb8cce2eabc5f5",
          messagingSenderId: "252418533413",
          apiKey: "AIzaSyCNUGWH1jm7meyTEJ1M1_DCJlGdcu_FiHQ",
          databaseURL: "",
          storageBucket: "messengerapp-13293.firebasestorage.app",
        });
      } else {
        firebase.app();
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Main />
        <StatusBar style="dark" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
