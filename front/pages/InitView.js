import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { basic_theme } from '../theme';

export default function InitView() {
  const { width, height } = Dimensions.get('window'); //반응형을 위한 화면 크기 구하기
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Image style={{ ...styles.logo, marginVertical: 110 }} source={require('../assets/img/moon.png')} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ ...styles.text }}>달이</Text>
        <Text style={styles.text}>들어주는</Text>
        <Text style={{ ...styles.text, marginLeft: 90 }}>오늘</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Image style={{ width: width, height: height / 2.2 }} source={require('../assets/img/cloud.png')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: basic_theme.bgColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 48,
    fontFamily: 'Gowun_Batang',
    fontWeight: '400',
    color: 'white',
  },
  logo: {
    width: 100,
    height: 100,
  },
});
