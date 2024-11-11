import {
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  Pressable,
} from "react-native";
import React from "react";

interface AppButtonProps {
  onPress: () => void;
  loading?: boolean;
  title: string;
  leftComponent?: JSX.Element;
  RightComponent?: JSX.Element;
  disabled?: boolean;
  style?: ViewStyle;
}

const AppButton: React.FC<AppButtonProps> = ({
  RightComponent,
  leftComponent,
  title,
  loading,
  onPress,
  disabled,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.button, disabled && styles.disabled, style]}
    >
      {leftComponent && !loading ? leftComponent : null}
      {title && !loading && <Text style={styles.text}>{title}</Text>}
      {RightComponent && !loading ? RightComponent : null}
      {loading && <ActivityIndicator size={"small"} />}
    </Pressable>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4D5382",
    borderRadius: 8,
    padding: 12,
    marginVertical: 4,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: "600",
  },
  disabled: {
    backgroundColor: "#658E9C",
  },
});
