import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

interface Props {
  navigation: NavigationStackProp;
}

export const PicsList: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>PICS LIST</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PicDetail');
        }}
      >
        <Text>Click to navigate</Text>
      </TouchableOpacity>
    </View>
  );
};
