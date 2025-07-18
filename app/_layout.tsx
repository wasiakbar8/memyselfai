import { Stack } from 'expo-router';
import React from 'react';

const _layout = () => {
  return (
    
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="unifiedinbox" />
        <Stack.Screen name="vaultscreen" />
        <Stack.Screen name="voicescreen" />
        <Stack.Screen name="profile" />
      </Stack>
    
  );
};

export default _layout;
