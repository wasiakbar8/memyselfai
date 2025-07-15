import React from 'react';
import {
  Text,
  TextStyle,
  TouchableOpacity,
  useWindowDimensions,
  ViewStyle
} from 'react-native';

type MyButtonProps = {
  title: string;
  onPress: () => void;
};

const MyButton = ({ title, onPress }: MyButtonProps) => {
  const { width } = useWindowDimensions();

  const dynamicStyles = getDynamicStyles(width);

  return (
    <TouchableOpacity style={dynamicStyles.button} onPress={onPress}>
      <Text style={dynamicStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const getDynamicStyles = (width: number): {
  button: ViewStyle;
  buttonText: TextStyle;
} => ({
  button: {
    backgroundColor: '#ffed29',
    paddingVertical: width * 0.03, // responsive vertical padding
    paddingHorizontal: width * 0.05, // responsive horizontal padding
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 4,
    alignSelf: 'center',
    minWidth: width * 0.85, // 60% of screen width
    maxWidth: width * 0.85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: Math.min(20, width * 0.045), // clamp to avoid huge text
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default MyButton;
