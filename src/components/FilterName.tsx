import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface FilterNameProps {
  name: string;
  onPress: () => void;
  notAdded: boolean;
  headerColor?: string;
}

const FilterName: React.FC<FilterNameProps> = ({
  name,
  onPress,
  notAdded,
  headerColor = "#4477CE",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderRadius: 16,
        backgroundColor: notAdded ? "#fff" : headerColor,
        alignSelf: "center",
        justifyContent: "center",
        borderColor: notAdded ? headerColor : "#fff",
        padding: 10,
        borderWidth: 0.5,
      }}>
      <Text
        style={{
          color: notAdded ? headerColor : "#fff",
          fontSize: 12,
          fontWeight: "bold",
        }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterName;
