import { useState, useEffect } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { globalStyles } from "../../styles";

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function fetchWeather(
    lat: number | undefined,
    lng: number | undefined
  ) {
    setLoading(true);

    await fetch(
      `https://api.weatherapi.com/v1/current.json?key=e46765c40ab8465c86c101528240811&q=${lat},${lng}`
    )
      .then(async (res) => {
        const data = await res.json();
        setWeather(data);
      })
      .catch((err) => setErrorMsg(String(err)))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    if (location)
      fetchWeather(location?.coords.latitude, location?.coords.longitude);
  }, [location]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      setLoading(true);
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Loading...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location && weather) {
    text = "";
  }

  return (
    <View style={styles.container}>
      {text ? (
        <Text style={styles.paragraph}>{text}</Text>
      ) : (
        <View style={globalStyles.vStack}>
          <Image
            source={{
              uri: `https:${weather?.current?.condition?.icon.replace(
                "64x64",
                "128x128"
              )}`,
            }}
            width={124}
            height={124}
            style={{ marginHorizontal: "auto" }}
          />
          <View style={[globalStyles.hStack, { justifyContent: "center" }]}>
            <Text style={{ fontSize: 20, fontWeight: "600" }}>
              {weather?.current?.temp_c} &deg;C
            </Text>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Pressable
                onPress={() =>
                  fetchWeather(
                    location?.coords.latitude,
                    location?.coords.longitude
                  )
                }
              >
                <Ionicons name="refresh" size={24} color="black" />
              </Pressable>
            )}
          </View>
          <View style={[globalStyles.hStack, { justifyContent: "center" }]}>
            <Entypo name="location-pin" size={24} color="black" />
            <Text style={styles.text}>{weather?.location?.name},</Text>
          </View>
          <Text style={styles.text}>{weather?.location?.country}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
