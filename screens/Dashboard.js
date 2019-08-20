import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, AsyncStorage, Alert, StyleSheet } from 'react-native';
import { Fab, Icon } from 'native-base';

import { ListItem } from '../components';
import { color } from '../config';

const Dashboard = (props) => {
  const [isInit, setIsInit] = useState(false);
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const onSubmit = (obj) => {
    setData([obj, ...data]);
    setFiltered([obj, ...filtered]);
  }

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(token => {
        if (!token) {
          props.navigation.navigate('Login')
        } else {
          setIsInit(true);
          return AsyncStorage.getItem('list')
        }
      })
      .then(list => {
        if (list) {
          setData([...JSON.parse(list)])
          setFiltered([...JSON.parse(list)])
        }
      })
      .catch(err => {
        console.log({ message: 'AsyncStorage Dashboard', err });
        Alert.alert(
          'Error: 500',
          'Async Dashboard',
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
      <View style={styles.container}>
        <FlatList
          data={filtered}
          renderItem={(subprops) => <ListItem {...props} {...subprops} />}
          ItemSeparatorComponent={() => <View style={{ backgroundColor: color.line, height: 1 }}/>}
          keyExtractor={(item, index) => index.toString()}
        />
        <Fab
          style={{ backgroundColor: color.plain }}
          position="bottomRight"
          onPress={() => props.navigation.navigate('Form', { onSubmit })}
        >
          <Icon
            name="add"
            style={{ color: color.active }}
          />
        </Fab>
      </View>
  )
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
