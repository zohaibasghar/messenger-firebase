import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./stacks/Auth";
import HomeStack from "./stacks/HomeStack";
import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { useAppDispatch } from "./store/store";
import { loginUser } from "./store/slices/user.slice";

const Stack = createStackNavigator();

export default function Main() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const dispatch = useAppDispatch();

  function onAuthStateChanged(user: any) {
    setUser(user);
    dispatch(loginUser(user));
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if (initializing) return null;
  if (!user)
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
      </Stack.Navigator>
    );

  return (
    <Stack.Navigator
      initialRouteName="HomeStack"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomeStack" component={HomeStack} />
    </Stack.Navigator>
  );
}
