import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import MyButton from './component/MyButton';

const index = () => {
  const router = useRouter();
  const oncontinue =()=>{
router.navigate('/login')
  }
  return (
    
    <View style={{flex:1,justifyContent:"center",alignItems:'center'}}>
      <MyButton title="Continue"onPress={oncontinue}/>
    </View>
  )
}

export default index