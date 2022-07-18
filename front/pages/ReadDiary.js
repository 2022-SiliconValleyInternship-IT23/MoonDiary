import { View, StyleSheet, Text, ScrollView, Image, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { basic_theme } from '../theme';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const ReadDiary = () => {
  const deviceW = Dimensions.get('window').width;
  const deviceH = Dimensions.get('window').height;
  let [fontsLoaded] = useFonts({
    //폰트 가져오기
    Gowun_Batang: require('../assets/fonts/GowunBatang-Regular.ttf'),
  });

  if (!fontsLoaded) {
    //폰트 가져오는 동안 AppLoading (local이라 짧은시간)
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.25, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ ...styles.text, color: 'white', fontSize: 18, paddingTop: 20 }}>홍길동님의 7월12일의 기록</Text>
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: '#D8E3E4', margin: 10 }}>
        <View style={{ flexDirection: 'row', padding: 10 }}>
          <Text style={{ ...styles.text, fontSize: 14 }}>2022년 07월 12일</Text>
          <Image style={styles.img} source={require('../assets/img/emotion/joy.png')}></Image>
          <Image style={styles.img} source={require('../assets/img/weather/sunny.png')}></Image>
        </View>
        <View style={{ alignItems: 'center', margin: 4 }}>
          <Image style={{ width: deviceW / 2, height: deviceH / 4 }} source={require('../assets/img/moon.png')}></Image>
        </View>
        <View style={{ margin: 4 }}>
          <Text style={{ ...styles.text, fontSize: 16, marginBottom: 2 }}>일기 제목</Text>
          <Text style={styles.text}>일기 내용</Text>
        </View>
      </ScrollView>
      <View style={{ flex: 0.25 }}>
        <Image source={require('../assets/img/speech-bubble.png')} style={styles.speech}></Image>
        <Text style={{ ...styles.text, margin: 20, fontSize: 16, alignSelf: 'center' }}>
          홍길동님에게 정말 뿌듯한 날이였군요
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          marginBottom: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Image style={{ width: deviceW / 5, height: deviceH / 10 }} source={require('../assets/img/moon.png')}></Image>
        <TouchableOpacity style={styles.btn}>
          <Text>수정하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: basic_theme.bgColor,
  },
  text: {
    fontFamily: 'Gowun_Batang',
  },
  img: {
    width: 20,
    height: 20,
  },
  mybox: {
    backgroundColor: basic_theme.fgColor,
    borderRadius: 8,
    margin: 10,
  },
  btn: {
    height: 40,
    padding: 10,
    borderRadius: 8,
    backgroundColor: basic_theme.btnColor,
    justifyContent: 'center',
  },
  speech: {
    alignSelf: 'center',
    height: Dimensions.get('window').height / 7,
    resizeMode: 'stretch',
    position: 'absolute',
  },
});

export default ReadDiary;
