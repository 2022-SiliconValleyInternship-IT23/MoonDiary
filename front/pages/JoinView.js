import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { basic_theme } from '../theme';
const baseUrl = 'http://127.0.0.1:8000';
const joinUrl = '/user/join';
const JoinView = ({ navigation }) => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const submitJoinData = async () => {
    const response = await axios
      .post(
        `${baseUrl}${joinUrl}`,
        {
          // 서버통신
          userId: JSON.stringify(userId),
          name: JSON.stringify(name),
          password: JSON.stringify(password),
        },
        {
          headers: {
            'Content-Type': `application/json`,
          },
        }
      )
      .then((res) => {
        console.log('성공');
      })
      .catch((error) => console.log('에러' + error));
    if (response.status == 201) {
      await AsyncStorage.setItem('userId', JSON.stringify(userId)); //로그인 정보 저장
      navigation.navigate('BottomTabHome');
    } else if (response.status == 409) {
      //이미 있는아이디일때
      alert('이미 가입된 아이디입니다.');
    }
  };
  let [fontsLoaded] = useFonts({
    //폰트 가져오기
    Gowun_Batang: require('../assets/fonts/GowunBatang-Regular.ttf'),
  });

  if (!fontsLoaded) {
    //폰트 가져오는 동안 AppLoading (local이라 짧은시간)
    return <AppLoading />;
  }

  return (
    <View style={style.container}>
      <Image source={require('../assets/img/moon.png')} style={style.moon}></Image>
      <Image source={require('../assets/img/cloud.png')} style={style.cloud}></Image>
      <Text style={style.text}>안녕하세요?</Text>
      <Text style={style.text}>저는 당신의 이야기를 좋아하는 달입니다.</Text>
      <View style={style.inputContainer}>
        <Text style={style.text}>당신의 이름은 무엇인가요?</Text>
        <View style={style.inputBox}>
          <TextInput placeholder="홍길동" onChangeText={setName}></TextInput>
        </View>
      </View>
      <View style={style.inputContainer}>
        <Text style={style.text}>ID를 설정해주세요.</Text>
        <View style={style.inputBox}>
          <TextInput placeholder="TeamI_IT23" onChangeText={setUserId}></TextInput>
        </View>
      </View>
      <View style={style.inputContainer}>
        <Text style={style.text}>비밀번호를 설정해주세요.</Text>
        <View style={style.inputBox}>
          <TextInput placeholder="SiliconValleyInternship2022" onChangeText={setPassword}></TextInput>
        </View>
      </View>
      <View style={style.buttonContainer}>
        <TouchableOpacity onPress={submitJoinData} activeOpacity={0.7} style={style.buttonBox}>
          <Text style={style.text}>{'시작하기'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: basic_theme.bgColor,
    alignItems: 'center',
  },
  moon: {
    width: 120,
    height: 122,
    marginBottom: 20,
    marginTop: Dimensions.get('window').height / 8,
  },
  cloud: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2.6,
  },
  text: {
    fontSize: 17,
    fontFamily: 'Gowun_Batang',
    color: 'white',
    marginVertical: 2,
  },
  inputContainer: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 15,
  },
  inputBox: {
    minWidth: 90,
    maxWidth: 190,
    height: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: basic_theme.btnColor,
    marginTop: 4,
  },
  buttonBox: {
    height: 40,
    width: 100,
    borderWidth: 2,
    backgroundColor: basic_theme.btnColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: basic_theme.btnColor,
    borderRadius: 100,
    marginTop: 10,
  },
});

export default JoinView;
