import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LogoImage from '../../assets/images/nba_login_logo.png';

const Logo = (props) => (
  <View style={styles.wrapper}>
    <Image
      style={[styles.image, props.overrideStyle]}
      source={LogoImage}
      resizeMode={'contain'}
    />
  </View>
);

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 150,
  },
  wrapper: {
    alignItems: 'center'
  }
});

export default Logo;
