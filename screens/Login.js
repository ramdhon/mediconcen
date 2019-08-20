import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
  Keyboard,
  AsyncStorage,
  StyleSheet
} from 'react-native';
import { Button, Form, Item, Input, Icon } from 'native-base';

import { color, space, fontSize } from "../config";

const Login = ({ navigation }) => {
  const [isInit, setIsInit] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isShown, setIsShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const defaultUser = {
    username: 'user',
    password: 'user'
  }

  const handleUsername = (eText) => {
    setUsername(eText);
  }
  const handlePassword = (eText) => {
    setPassword(eText);
  }
  const showPass = () => {
    setIsShown(!isShown);
  }
  const login = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (username !== defaultUser.username || password !== defaultUser.password) {
        Alert.alert(
          'Incorrect',
          'Username or password',
          [
            {
              text: 'OK',
              style: 'cancel',
            }
          ],
          {cancelable: false}
        );
      } else {
        AsyncStorage.setItem('token', JSON.stringify({ username, password }));
        navigation.navigate('Main')
      }
    }, 1000)
  }

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(token => {
        if (token) {
          navigation.navigate('Main');
        } else {
          setIsInit(true);
        }
      })
      .catch(err => {
        console.log({ message: 'AsyncStorage Login', err });
        Alert.alert(
          'Error: 500',
          'Async Login',
          [
            {
              text: 'OK',
              style: 'cancel',
            }
          ],
          {cancelable: false}
        );
      }) 
  }, [])

  return (
    isInit &&
      <KeyboardAvoidingView style={styles.avoid} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Form>
              <Item>
                <Input
                  placeholder="Username"
                  onChangeText={handleUsername}
                  clearButtonMode="always"
                  value={username}
                />
              </Item>
              <Item>
                <Input
                  placeholder="Password"
                  onChangeText={handlePassword}
                  clearButtonMode="always"
                  secureTextEntry={!isShown}
                  value={password}
                />
                <TouchableHighlight
                  style={styles.touch}
                  underlayColor={color.underlay}
                  onPress={showPass}
                >
                  {
                    !isShown ?
                      <Icon
                        name="visibility"
                        type="MaterialIcons"
                        style={{ color: color.inactive }}
                      />
                    : 
                      <Icon
                        name="visibility-off"
                        type="MaterialIcons"
                        style={{ color: color.inactive }}
                      />
                  }
                </TouchableHighlight>
              </Item>
              <View style={styles.submitArea}>
                <Button block info onPress={login}>
                  {
                    loading ? 
                      <ActivityIndicator color={color.plain} />
                    :
                      <Text style={styles.buttonText}>Login</Text>
                  }
                </Button>
              </View>
            </Form>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  )
}

export default Login;

const styles = StyleSheet.create({
  avoid: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: space.fluid,
    justifyContent: 'center'
  },
  submitArea: {
    marginTop: space.container
  },
  title: {
    fontSize: fontSize.headline,
    color: color.active
  },
  buttonText: {
    fontWeight: 'bold',
    color: color.plain
  },
  touch: {
    borderRadius: 22
  }
})
