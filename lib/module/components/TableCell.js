function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useMemo } from 'react';
import { Text, View, PanResponder } from 'react-native';
const Cell = ({
  title,
  isHeader = false,
  width,
  // Rename initialWidth to width
  headerColor = '#4477CE',
  handlePanResponderMove
}) => {
  //   const [cellWidth, setCellWidth] = useState(width);

  // const handlePanResponderMove = (_: any, gestureState: any) => {
  //   const newWidth = Math.max(0, width + gestureState.dx);
  //   setCellWidth(newWidth);
  // };

  const panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: handlePanResponderMove
  }), [width]);
  const containerStyle = {
    width: width,
    borderWidth: 0.5,
    borderColor: isHeader ? '#fff' : '#000',
    justifyContent: 'center',
    backgroundColor: isHeader ? headerColor : undefined
  };
  const textStyle = {
    fontWeight: isHeader ? 'bold' : 'normal',
    color: isHeader ? '#fff' : '#000',
    textAlign: 'center',
    padding: 10
  };
  return /*#__PURE__*/React.createElement(View, _extends({
    style: containerStyle
  }, panResponder.panHandlers), /*#__PURE__*/React.createElement(Text, {
    style: textStyle
  }, title));
};
export default Cell;
//# sourceMappingURL=TableCell.js.map