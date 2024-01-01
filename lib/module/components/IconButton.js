import * as React from 'react';
import { AntDesign } from './VectorIcons';
import { Pressable } from 'react-native';
const IconButton = ({
  icon,
  iconColor,
  containerColor,
  size,
  onPress
}) => {
  return /*#__PURE__*/React.createElement(Pressable, {
    onPress: onPress,
    style: {
      height: size,
      width: size,
      borderRadius: 20,
      backgroundColor: containerColor,
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(AntDesign, {
    name: icon,
    color: iconColor,
    size: size / 2
  }));
};
export default IconButton;
//# sourceMappingURL=IconButton.js.map