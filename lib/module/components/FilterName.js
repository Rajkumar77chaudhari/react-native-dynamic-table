import React from 'react';
import { Pressable, Text } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
const FilterName = ({
  name,
  showFilter,
  onPress,
  notAdded,
  headerColor = '#4477CE'
}) => {
  const animatedStyles = useAnimatedStyle(() => ({
    padding: showFilter ? withTiming(10) : withTiming(0),
    borderWidth: showFilter ? withTiming(0.5) : withTiming(0)
  }));
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [{
      borderRadius: 16,
      backgroundColor: notAdded ? '#fff' : headerColor,
      alignSelf: 'center',
      justifyContent: 'center',
      borderColor: notAdded ? headerColor : '#fff'
    }, animatedStyles]
  }, /*#__PURE__*/React.createElement(Pressable, {
    onPress: onPress
  }, /*#__PURE__*/React.createElement(Text, {
    style: {
      color: notAdded ? headerColor : '#fff',
      fontSize: 12,
      fontWeight: 'bold'
    }
  }, name)));
};
export default FilterName;
//# sourceMappingURL=FilterName.js.map