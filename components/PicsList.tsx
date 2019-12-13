import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { getLastPic } from '../services/xkcdApi';

interface Props {
  navigation: NavigationStackProp;
}

interface Picture {
  month: string;
  num: number;
  year: string;
  safe_title: string;
  alt: string;
  img: string;
  title: string;
  day: string;
}

export const PicsList: React.FC<Props> = ({ navigation }) => {
  const [pics, setPics] = useState<Picture[]>([]);

  const initFetch = async () => {
    const lastPic = await getLastPic();
    setPics([lastPic]);
  };

  useEffect(() => {
    initFetch();
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      {pics.map(pic => (
        <TouchableOpacity
          key={pic.num}
          onPress={() => {
            navigation.navigate('PicDetail');
          }}
        >
          <View style={styles.itemContainer}>
            <Text style={styles.title}>{pic.safe_title}</Text>
            <Image
              style={styles.picture}
              source={{ uri: `${pic.img}` }}
              resizeMode='contain'
            />
          </View>
        </TouchableOpacity>
      ))}
      {/*<Text>{JSON.stringify(pics)}</Text> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'beige'
  },
  itemContainer: {
    margin: 15,
    padding: 15,
    backgroundColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 20
  },
  picture: {
    width: 100,
    height: 100
  }
});
