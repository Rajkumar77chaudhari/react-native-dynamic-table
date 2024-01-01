import React, {useMemo} from 'react';
import {Text, View, PanResponder, type ViewStyle, type TextStyle} from 'react-native';

interface CellProps {
  title: string | number | undefined | null;
  isHeader?: boolean;
  width: number; // Rename initialWidth to width
  headerColor?: string;
  handlePanResponderMove?: (_: any, gestureState: any) => void;
}

const Cell: React.FunctionComponent<CellProps> = ({
  title,
  isHeader = false,
  width, // Rename initialWidth to width
  headerColor = '#4477CE',
  handlePanResponderMove,
}) => {
//   const [cellWidth, setCellWidth] = useState(width);

    // const handlePanResponderMove = (_: any, gestureState: any) => {
    //   const newWidth = Math.max(0, width + gestureState.dx);
    //   setCellWidth(newWidth);
    // };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: handlePanResponderMove,
      }),
    [width],
  );

  const containerStyle: ViewStyle = {
    width: width,
    borderWidth: 0.5,
    borderColor: isHeader ? '#fff' : '#000',
    justifyContent: 'center',
    backgroundColor: isHeader ? headerColor : undefined,
  };

  const textStyle: TextStyle = {
    fontWeight: isHeader ? 'bold' : 'normal',
    color: isHeader ? '#fff' : '#000',
    textAlign: 'center',
    padding: 10,
  };

  return (
    <View style={containerStyle} {...panResponder.panHandlers}>
      <Text style={textStyle}>{title}</Text>
    </View>
  );
};

export default Cell;
