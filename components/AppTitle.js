import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import { aspect } from '../config';

const img = require('../assets/logos/logo.png');

const AppTitle = () => {
  return (
    <View style={styles.title}>
      <Image
        style={styles.image}
        source={img}
      />
    </View>
  )
}

export default AppTitle;

const aRatio = aspect(img);
const height = 40;
const width = aRatio * height;
const styles = StyleSheet.create({
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width,
    height
  }
})
