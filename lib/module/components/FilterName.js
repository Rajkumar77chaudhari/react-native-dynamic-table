import React from "react";
import { Text, TouchableOpacity } from "react-native";
const FilterName = ({
  name,
  onPress,
  notAdded,
  headerColor = "#4477CE"
}) => {
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onPress,
    style: {
      borderRadius: 16,
      backgroundColor: notAdded ? "#fff" : headerColor,
      alignSelf: "center",
      justifyContent: "center",
      borderColor: notAdded ? headerColor : "#fff",
      padding: 10,
      borderWidth: 0.5
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      color: notAdded ? headerColor : "#fff",
      fontSize: 12,
      fontWeight: "bold"
    }
  }, name));
};
export default FilterName;
//# sourceMappingURL=FilterName.js.map