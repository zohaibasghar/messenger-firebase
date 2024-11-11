import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../screens/Home/Dashboard";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import Inbox from "../screens/Home/Inbox";
import ChatScreen from "../screens/Home/ChatScreen";

const Stack = createStackNavigator();

export default function HomeStack() {
  const user = auth().currentUser;
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Dashboard}
        name="Dashboard"
        options={{
          headerTitleAlign: "center",
          headerTitle: user?.email as string,
          headerTitleStyle: { fontSize: 18 },
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 12 }}
              onPress={() =>
                auth()
                  .signOut()
                  .catch((err) => console.log(err))
              }
            >
              <MaterialIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="Inbox" component={Inbox} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}
