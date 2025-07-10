import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type MyButtonProps = {
  title: string;
  onPress:()=>void
};

const MyButton = ({ title,onPress }: MyButtonProps) => {
  return (
    
      <TouchableOpacity style={styles.btn1}
      onPress={onPress}>
        <Text style={{ fontSize: 18,fontWeight:"bold" }}>{title}</Text>
      </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  btn1: {
    
    backgroundColor: "#ffed29",
    paddingVertical: 16,
    paddingHorizontal: 140,
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 4
  }
});

export default MyButton;
