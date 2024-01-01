import * as React from 'react';
import {AntDesign} from './VectorIcons';
import {Pressable} from 'react-native';

interface IconButtonProps {
  icon: string;
  iconColor: string;
  containerColor: string;
  size: number;
  onPress: () => void;
}

const IconButton: React.FunctionComponent<IconButtonProps> = ({
  icon,
  iconColor,
  containerColor,
  size,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        height: size,
        width: size,
        borderRadius: 20,
        backgroundColor:containerColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AntDesign name={icon} color={iconColor} size={size/2}/>
    </Pressable>
  );
};

export default IconButton;
