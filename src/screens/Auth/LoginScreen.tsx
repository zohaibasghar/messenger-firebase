import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import AppButton from "../../components/AppButton";
import { globalStyles } from "../../../styles";
import { useAppDispatch } from "../../store/store";
import { loginUser } from "../../store/slices/user.slice";

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          dispatch(loginUser(res.user));
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            return setError("That email address is already in use!");
          }

          if (error.code === "auth/invalid-email") {
            return setError("That email address is invalid!");
          }

          return setError(error?.message);
        })
        .finally(() => setLoading(false));
    } catch (err: any) {
      console.log(err);
      setError(err?.message);
    }
  };

  return (
    <View style={[globalStyles.screen, globalStyles.vStack]}>
      <TextInput
        placeholder="Email"
        style={globalStyles.customInput}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        style={globalStyles.customInput}
        secureTextEntry
        onChangeText={setPassword}
      />
      <AppButton
        title="Login"
        onPress={handleLogin}
        disabled={!email || !password}
        loading={loading}
      />

      {error ? <Text style={globalStyles.error}>{error}</Text> : null}
      <TouchableOpacity onPress={() => navigation.navigate("Signup" as never)}>
        <Text
          style={{
            textAlign: "center",
            marginTop: 12,
            fontSize: 16,
            fontStyle: "italic",
            textDecorationLine: "underline",
          }}
        >
          Signup
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
