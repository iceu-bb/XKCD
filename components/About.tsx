import React, { Fragment, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { aboutText } from '../data/text';

export const About: React.FC = () => {
  const renderedContent = useMemo(() => {
    return aboutText.map(content => {
      const { id, title, text } = content;
      return (
        <Fragment key={id}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.paragraph}>{text}</Text>
        </Fragment>
      );
    });
  }, []);

  return (
    <ScrollView>
      <LinearGradient
        style={styles.gradient}
        colors={['#129C8D', '#1BB08A', '#23C186']}
      >
        <View style={styles.container}>{renderedContent}</View>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 6
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10
  },
  gradient: {
    flex: 1
  }
});
