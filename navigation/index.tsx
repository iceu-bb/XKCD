import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { About } from '../components/About';
import { PicsList } from '../components/PicsList';
import { PicDetailed } from '../components/PicDetailed';

const PicsListStack = createStackNavigator({
  PicsList: {
    screen: PicsList,
    navigationOptions: {
      headerTitle: 'Latest XKCD memes'
    }
  },
  PicDetail: {
    screen: PicDetailed,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.getParam('title')
    })
  }
});

const AboutSectionStack = createStackNavigator({
  AboutSection: {
    screen: About,
    navigationOptions: {
      headerTitle: 'About'
    }
  }
});

const Tabs = createBottomTabNavigator({
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
});

export default createAppContainer(Tabs);
