import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Button, Icon } from 'native-base';
import Swipeout from 'react-native-swipeout';

import { space, color, fontSize } from '../config';

const ListItem = ({ navigation, item }) => {
  const [isDetail, setIsDetail] = useState(false);

  const toogleDetail = () => {
    setIsDetail(!isDetail);
  }
  const onSubmit = () => {
    return 0;
  }

  const swipeoutBtns = [
    {
      backgroundColor: color.sky,
      component: (
        <View style={styles.swipeButton}>
          <Icon
            name="create"
            style={styles.iconButton}
          />
          <Text style={styles.iconButton}>Edit</Text>
        </View>
      ),
      onPress: () => {
        navigation.navigate('Form', { onSubmit, item });
      }
    },
    {
      backgroundColor: color.danger,
      component: (
        <View style={styles.swipeButton}>
          <Icon
            name="trash"
            style={styles.iconButton}
          />
          <Text style={styles.iconButton}>Delete</Text>
        </View>
      ),
      onPress: () => {
        Alert.alert(
          'Confirmation',
          'Are you sure?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Confirm',
            }
          ],
          {cancelable: false}
        );
      }
    }
  ]

  return (
    <Swipeout right={swipeoutBtns} onOpen={() => setIsDetail(false)} style={styles.swipe}>
      <View style={styles.container}>
        <Icon
          name="images"
          style={styles.icon}
        />
        <View style={styles.content}>
          <Text style={styles.titleText}>{item.title}</Text>
          { 
            isDetail ? 
              <Text style={styles.descriptionText}>{item.description}</Text>
            :
              <Text numberOfLines={1} style={styles.descriptionTruncText}>{item.description}</Text>
          }
          <Button small transparent onPress={toogleDetail}>
            <Text style={styles.buttonText}>See details...</Text>
          </Button>
        </View>
      </View>
    </Swipeout>
  )
}

export default ListItem;

const styles = StyleSheet.create({
  swipe: {
    backgroundColor: color.plain
  },
  container: {
    flex: 1,
    padding: space.fluid,
    flexDirection: 'row'
  },
  content: {
    paddingHorizontal: space.fluid
  },
  titleText: {
    color: color.active,
    fontSize: fontSize.title
  },
  descriptionText: {
    color: color.text
  },
  descriptionTruncText: {
    flex: 1,
    color: color.text
  },
  buttonText: {
    color: color.active
  },
  icon: {
    color: color.inactive,
    fontSize: fontSize.headline
  },
  swipeButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconButton: {
    color: color.plain
  }
})
