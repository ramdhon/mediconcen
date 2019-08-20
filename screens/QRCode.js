import React from 'react';
import { Text, View, SafeAreaView, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';

import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { color, fontSize, space } from '../config';

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    alert: false
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, scanned, alert } = this.state;

    if (hasCameraPermission === null) {
      return (
        <SafeAreaView>
          <View style={styles.center}>
            <Text>Requesting for camera permission</Text>
          </View>
        </SafeAreaView>
      )
    }
    if (hasCameraPermission === false) {
      return (
        <SafeAreaView>
          <View style={styles.center}>
            <Text>No access to camera</Text>
          </View>
        </SafeAreaView>
      )
    }
    return (
      <View
        style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {
          scanned && !alert &&
            <TouchableOpacity
              style={styles.circleButton}
              onPress={() => this.setState({ scanned: false })}
            >
              <Text style={styles.buttonText}>Scan</Text>
            </TouchableOpacity>
        }
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true, alert: true });
    Alert.alert(
      'Code Scanned',
      `Type: ${type}\nData: ${data}`,
      [
        {text: 'Scan another', onPress: () => this.setState({ scanned: false, alert: false })},
        {
          text: 'Cancel',
          onPress: () => {
            this.setState({ alert: false });
          },
          style: 'cancel'
        }
      ],
      {cancelable: false}
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? space.container : 0
  },
  circleButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderColor: color.plain,
    borderWidth: 5,
    margin: space.wide
  },
  buttonText: {
    color: color.plain,
    fontSize: fontSize.title,
    fontWeight: 'bold'
  }
})