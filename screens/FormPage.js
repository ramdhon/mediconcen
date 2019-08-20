import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, AsyncStorage, StyleSheet } from 'react-native';
import { Button, Form, Item, Input, Textarea, Label } from 'native-base';

import { space, color } from '../config';

const FormPage = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { onSubmit, item } = navigation.state.params;

  const handleTitle = (eText) => {
    setTitle(eText);
  }
  const handleDescription = (eText) => {
    setDescription(eText);
  }
  const submit = () => {
    setLoading(true);
    AsyncStorage.getItem('list')
      .then(list => {
        let data = [];
        if (list) {
          data = [...JSON.parse(list)]          
        }
        data.unshift({ title, description })
        // return AsyncStorage.removeItem('list')
        return AsyncStorage.setItem('list', JSON.stringify(data))
      })
      .then(info => {
        setLoading(false);
        onSubmit({ title, description });
        navigation.navigate('Dashboard');
      })
      .catch(err => {
        setLoading(false);
        console.log({ message: 'AsyncStorage Form', err });
        Alert.alert(
          'Error: 500',
          'Async Form',
          [
            {
              text: 'OK',
              style: 'cancel',
            }
          ],
          {cancelable: false}
        );
      }) 
  }

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.description);
    }
  }, [])

  return (
    <KeyboardAvoidingView style={styles.avoid} behavior="padding" keyboardVerticalOffset={85}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <ScrollView>
            <Form>
              <Item floatingLabel>
                <Label>Title</Label>
                <Input
                  onChangeText={handleTitle}
                  clearButtonMode="always"
                  value={title}
                />
              </Item>
              <Textarea
                rowSpan={5}
                bordered
                placeholder="Description"
                onChangeText={handleDescription}
                value={description}
              />
            </Form>
          </ScrollView>
          <View style={styles.submitArea}>
            <Button block info onPress={submit}>
              {
                loading ? 
                  <ActivityIndicator color={color.plain} />
                :
                  <Text style={styles.buttonText}>{item ? 'Edit' : 'Submit'}</Text>
              }
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default FormPage;

const styles = StyleSheet.create({
  avoid: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: space.fluid
  },
  submitArea: {
    paddingTop: space.fluid
  },
  buttonText: {
    fontWeight: 'bold',
    color: color.plain
  }
})
