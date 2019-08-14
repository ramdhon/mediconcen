import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default {
  container: 0.06 * width,
  fluid: 0.03 * width,
  wide: 0.12 * width
}