import React from 'react';
import {Pressable, Text} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

interface FilterNameProps {
  name: string;
  showFilter: boolean;
  onPress: () => void;
  notAdded: boolean;
  headerColor?: string;
}

const FilterName: React.FC<FilterNameProps> = ({
  name,
  showFilter,
  onPress,
  notAdded,
  headerColor = '#4477CE',
}) => {
  const animatedStyles = useAnimatedStyle(() => ({
    padding: showFilter ? withTiming(10) : withTiming(0),
    borderWidth: showFilter ? withTiming(0.5) : withTiming(0),
  }));
  return (
    <Animated.View
      style={[
        {
          borderRadius: 16,
          backgroundColor: notAdded ? '#fff' : headerColor,
          alignSelf: 'center',
          justifyContent: 'center',
          borderColor: notAdded ? headerColor : '#fff',
        },
        animatedStyles,
      ]}>
      <Pressable onPress={onPress}>
        <Text
          style={{
            color: notAdded ? headerColor : '#fff',
            fontSize: 12,
            fontWeight: 'bold',
          }}>
          {name}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default FilterName;
