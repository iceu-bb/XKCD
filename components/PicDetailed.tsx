import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { ParamProps } from '../types/index';

interface Props {
  navigation: NavigationStackProp<ParamProps>;
}

export const PicDetailed: React.FC<Props> = ({ navigation }) => {
  const { img } = navigation.state.params;
  // Todo: handle when no img

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={{ uri: img }}
      resizeMode='stretch'
    />
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
});
