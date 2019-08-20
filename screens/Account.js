import React, { useState, useEffect } from 'react';
import { View, Text, AsyncStorage, StyleSheet } from 'react-native';

import { space, color, fontSize } from '../config';
import { Button, Icon } from 'native-base';

const Account = ({ navigation }) => {
  const [isInit, setIsInit] = useState(false);
  const [user, setUser] = useState('');

  const logout = () => {
    AsyncStorage.removeItem('token')
    navigation.navigate('Login')
  }

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(token => {
        if (!token) {
          navigation.navigate('Login')
        } else {
          setIsInit(true);
          setUser(JSON.parse(token).username);
        }
      })
      .catch(err => {
        console.log({ message: 'AsyncStorage Account', err });
        Alert.alert(
          'Error: 500',
          'Async Account',
          [
            {
              text: 'OK',
              style: 'cancel',
            }
          ],
          {cancelable: false}
        );
      }) 
  })

  return (
    isInit &&
      <View style={styles.container}>
        <View>
          <View style={styles.avatar}>
            <Icon
              name="person"
              style={{ color: color.inactive, fontSize: fontSize.avatar }}
            />
          </View>
          <Text style={styles.userText}>@{user}</Text>
        </View>
        <Button block info onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Button>
      </View>
  )
}

export default Account;

const diameter = 144;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: space.fluid
  },
  userText: {
    fontSize: fontSize.headline,
  },
  buttonText: {
    fontWeight: 'bold',
    color: color.plain
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: diameter,
    height: diameter,
    borderRadius: diameter / 2,
    borderWidth: 1,
    borderColor: color.underlay
  }
})
