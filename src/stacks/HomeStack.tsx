import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../screens/Home/Dashboard";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { useAppSelector } from "../store/store";

export type HomeStackType = {
  Dashboard: JSX.Element;
};

const Stack = createStackNavigator<HomeStackType>();

export default function HomeStack() {
  const { user } = useAppSelector((state) => state.user);
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Dashboard}
        name="Dashboard"
        options={{
          headerTitleAlign: "center",
          headerTitle: user?.email,
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
    </Stack.Navigator>
  );
}
