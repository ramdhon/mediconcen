import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Form, Item, Input, Icon } from 'native-base';

import { space, color } from '../config';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearch = (eText) => {
    setSearch(eText);
  }

  useEffect(() => {
    onSearch(search);
  }, [search])

  return (
    <View style={styles.container}>
      <Form>
        <Item rounded style={{ backgroundColor: color.line }}>
          <Icon
            name="search"
            style={{ color: color.text}}
          />
          <Input
            onChangeText={handleSearch}
            placeholder="Search"
            value={search}
          />
        </Item>
      </Form>
    </View>
  )
}

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    padding: space.fluid
  }
})
