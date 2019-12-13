import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
  Dimensions
} from 'react-native';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
import { NavigationStackProp } from 'react-navigation-stack';
import { getFunnyPictures } from '../services/xkcdApi';
import { LinearGradient } from 'expo-linear-gradient';
import { Picture } from '../types/index';
import { wait } from '../helpers/index';

interface Props {
  navigation: NavigationStackProp;
}

export const PicsList: React.FC<Props> = ({ navigation }) => {
  const [pics, setPics] = useState<Picture[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    fetchPictures();
  }, [refreshing]);

  const fetchPictures = useCallback(async () => {
    const funnyPics = await getFunnyPictures();
    setPics([...funnyPics]);
  }, []);

  useEffect(() => {
    fetchPictures();
  }, []);

  const getDay = useCallback((day: number, month: number, year: number) => {
    const today = Date.now();
    const pictureReleaseDate = new Date(year, month !== 0 ? month - 1 : 0, day);
    const diffrenceMiliseconds = today - pictureReleaseDate.getTime();
    return Math.ceil(diffrenceMiliseconds / (1000 * 60 * 60 * 24));
  }, []);

  const renderItem = useCallback(pic => {
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
  }, []);

  const windowHeight = Dimensions.get('window').height;
  const numberOfPlaceholders = Math.floor((windowHeight - 100) / 120);
  const iteratedArray = Array(numberOfPlaceholders)
    .fill()
    .map((_, i) => i + 1);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {pics.length < 2 || refreshing ? (
        <LinearGradient colors={['#129C8D', '#1BB08A', '#23C186']}>
          <Placeholder
            Animation={Fade}
            style={{ paddingTop: 50, height: windowHeight }}
          >
            {iteratedArray.map((_, index) => (
              <PlaceholderLine
                key={index}
                width={80}
                height={100}
                style={styles.placeholder}
              />
            ))}
          </Placeholder>
        </LinearGradient>
      ) : (
        <LinearGradient colors={['#129C8D', '#1BB08A', '#23C186']}>
          {pics.map(pic => renderItem(pic))}
        </LinearGradient>
      )}
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
  },
  placeholder: {
    backgroundColor: '#1BB08A',
    marginBottom: 25,
    alignSelf: 'center'
  }
});
