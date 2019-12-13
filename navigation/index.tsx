import React from 'react';
import { Platform, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { About } from '../components/About';
import { PicsList } from '../components/PicsList';
import { PicDetailed } from '../components/PicDetailed';

const PicsListStack = createStackNavigator(
  {
    PicsList: {
      screen: PicsList,
      navigationOptions: {
        headerTitle: 'XKCD memes',
        headerStyle: {
          backgroundColor: '#C5E2EF'
        }
      }
    },
    PicDetail: {
      screen: PicDetailed,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.getParam('title'),
        headerStyle: {
          backgroundColor: '#24C386'
        }
      })
    }
  },
  {
    headerMode: 'float',
    headerTransitionPreset: 'uikit',
    headerLayoutPreset: 'center'
  }
);

const AboutSectionStack = createStackNavigator({
  AboutSection: {
    screen: About,
    navigationOptions: {
      headerTitle: 'About',
      headerStyle: {
        backgroundColor: '#A8D9F7'
      }
    }
  }
});

const Tabs = createBottomTabNavigator(
  {
    PicsList: {
      screen: PicsListStack,
      navigationOptions: {
        tabBarLabel: 'Memes'
      }
    },
    AboutSection: {
      screen: AboutSectionStack,
      navigationOptions: {
        tabBarLabel: 'About'
      }
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarOptions: {
        activeTintColor: '#e91e63',
        labelStyle: {
          fontSize: 10
        },
        style: {
          backgroundColor: '#eee'
        }
      },

      tabBarIcon: ({ tintColor, focused }) => {
        let image;
        const { routeName } = navigation.state;

        if (routeName === 'PicsList') {
          image = Platform.select({
            ios: require('../assets/icons/ios-list.png'),
            android: require('../assets/icons/md-list.png')
          });
        } else {
          image = Platform.select({
            ios: focused
              ? require('../assets/icons/ios-star.png')
              : require('../assets/icons/ios-star-outline.png'),
            android: focused
              ? require('../assets/icons/md-star.png')
              : require('../assets/icons/md-star-outline.png')
          });
        }

        return (
          <Image
            source={image}
            resizeMode='contain'
            style={{ width: 25, tintColor }}
          />
        );
      }
    })
  }
);

export default createAppContainer(Tabs);
