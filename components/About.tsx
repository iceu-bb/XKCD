import React from 'react';
import { View, Text } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

interface Props {
  navigation: NavigationStackProp;
}

export const About: React.FC<Props> = () => {
  return (
    <View>
      <Text>ABOUT</Text>
    </View>
  );
};
