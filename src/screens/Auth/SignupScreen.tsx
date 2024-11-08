import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import auth from "@react-native-firebase/auth";
import { globalStyles } from "../../../styles";
import AppButton from "../../components/AppButton";
import { useAppDispatch } from "../../store/store";
import { loginUser } from "../../store/slices/user.slice";
import firestore from "@react-native-firebase/firestore";

const SignupScreen = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const handleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (res) => {
          await firestore().collection("users").doc(res.user.uid).set({
            email: res.user.email,
            emailVerified: res.user.emailVerified,
            displayName: name,
            isAnonymous: res.user.isAnonymous,
            photoURL: res.user.photoURL,
            providerId: res.user.providerId,
            uid: res.user.uid,
            name,
          });
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
      <TextInput
        placeholder="Full Name"
        value={name}
        style={globalStyles.customInput}
        onChangeText={setName}
      />
      <AppButton title="Sign Up" onPress={handleSignup} loading={loading} />
      {error ? <Text style={globalStyles.error}>{error}</Text> : null}
    </View>
  );
};

export default SignupScreen;
