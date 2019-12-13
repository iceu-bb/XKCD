import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { getFunnyPictures } from '../services/xkcdApi';
import { LinearGradient } from 'expo-linear-gradient';

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

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export const PicsList: React.FC<Props> = ({ navigation }) => {
  const [pics, setPics] = useState<Picture[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(1500).then(() => setRefreshing(false));
    fetchPictures();
  }, [refreshing]);

  const fetchPictures = async () => {
    const funnyPics = await getFunnyPictures();
    setPics([...funnyPics]);
  };

  useEffect(() => {
    fetchPictures();
  }, []);

  const getDay = useCallback((day: number, month: number, year: number) => {
    if (day === undefined || month === undefined || day === undefined) return;

    const today = Date.now();
    const pictureReleaseDate = new Date(year, month !== 0 ? month - 1 : 0, day);
    const diffrenceMiliseconds = today - pictureReleaseDate.getTime();
    return Math.ceil(diffrenceMiliseconds / (1000 * 60 * 60 * 24));
  }, []);

  if (pics.length < 2)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <LinearGradient colors={['#129C8D', '#1BB08A', '#23C186']}>
        {pics.map(pic => {
          const { num, img, safe_title, day, month, year } = pic;
          return (
            <TouchableOpacity
              key={num}
              onPress={() => {
                navigation.navigate('PicDetail', {
                  title: safe_title,
                  img
                });
              }}
            >
              <View style={styles.itemContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{safe_title}</Text>
                  <Text style={styles.subTitle}>
                    {getDay(Number(day), Number(month), Number(year))} days ago
                  </Text>
                </View>

                <Image
                  style={styles.picture}
                  source={{ uri: `${img}` }}
                  resizeMode='cover'
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, .15)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5
  },
  textContainer: {
    width: '60%'
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
    color: '#fff'
  },
  subTitle: {
    fontWeight: '300'
  },
  picture: {
    width: '40%',
    height: 100
  }
});
