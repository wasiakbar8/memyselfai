import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

type MyButtonProps = {
  title: string;
  onPress: () => void;
};

const { width: screenWidth } = Dimensions.get('window');

const MyButton = ({ title, onPress }: MyButtonProps) => {
  return (
    <TouchableOpacity style={styles.btn1} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn1: {
    backgroundColor: "#ffed29",
    paddingVertical: 16,
    paddingHorizontal: screenWidth * 0.4, // 10% of screen width on each side
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 4,
    alignSelf: 'center', // Centers the button
    minWidth: screenWidth * 0.7, // Minimum 70% of screen width
    maxWidth: screenWidth * 0.9, // Maximum 90% of screen width
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: 'black',
    textAlign: 'center',
  }
});

export default MyButton;