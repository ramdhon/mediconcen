import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, AsyncStorage, Alert, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { Fab, Icon } from 'native-base';

import { ListItem, SearchBar } from '../components';
import { color } from '../config';

const Dashboard = (props) => {
  const [isInit, setIsInit] = useState(false);
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const onSubmit = (obj) => {
    setData([obj, ...data]);
    setFiltered([obj, ...filtered]);
  }
  const onDelete = (id) => {
    setData(data.filter(item => item.id !== id));
    setFiltered(filtered.filter(item => item.id !== id));
  }
  const onEdit = (obj) => {
    setData([obj, ...data.filter(item => item.id !== obj.id)])
    setFiltered([obj, ...filtered.filter(item => item.id !== obj.id)])
  }
  const onSearch = (keyword) => {
    const regex = new RegExp(keyword, 'gi');
    setFiltered(data.filter(item => regex.test(item.title) || regex.test(item.description)))
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
        <SearchBar onSearch={onSearch} />
        {
          !filtered.length ?
            <View style={styles.subcontainer}>
              <Text style={styles.text}>No data</Text>
            </View>
          :
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <FlatList
                data={filtered}
                // ListHeaderComponent={<SearchBar onSearch={onSearch} />}
                renderItem={(subprops) => <ListItem onDelete={onDelete} onEdit={onEdit} {...props} {...subprops} />}
                ItemSeparatorComponent={() => <View style={{ backgroundColor: color.line, height: 1 }}/>}
                keyExtractor={(item, index) => index.toString()}
              />    
            </TouchableWithoutFeedback>
        }
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
  },
  subcontainer: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    color: color.text
  }
})
