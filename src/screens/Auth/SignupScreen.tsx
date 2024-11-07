import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import auth from "@react-native-firebase/auth";
import { globalStyles } from "../../../styles";
import AppButton from "../../components/AppButton";
import { useAppDispatch } from "../../store/store";
import { loginUser } from "../../store/slices/user.slice";

const SignupScreen = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const handleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          dispatch(loginUser(res.user));
        })
        .finally(() => setLoading(false));
    } catch (err: any) {
      setError(err?.message);
    }
  };

  return (
    <View style={[globalStyles.screen, globalStyles.vStack]}>
      <TextInput
        style={globalStyles.customInput}
        placeholder="Email"
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
      <AppButton title="Sign Up" onPress={handleSignup} loading={loading} />
      {error ? <Text style={globalStyles.error}>{error}</Text> : null}
    </View>
  );
};

export default SignupScreen;
