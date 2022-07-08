import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { basic_theme } from '../theme';
import { FontAwesome5 } from '@expo/vector-icons';
import Calendar from '../components/Calendar';

const HomeView = ({ navigation }) => {
  const { userName, setUserName } = useState('홍길동'); //사용자 로그인시 state 관리 필요할 코드
  let [fontsLoaded] = useFonts({
    //폰트 가져오기
    Gowun_Batang: require('../assets/fonts/GowunBatang-Regular.ttf'),
  });

  if (!fontsLoaded) {
    //폰트 가져오는 동안 AppLoading (local이라 짧은시간)
    return <AppLoading />;
  }
  const goWrite = () => {
    //글쓰기 화면으로 stack쌓는 코드 필요
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ ...styles.text, marginTop: 40 }}>안녕하세요 {userName}님?</Text>
        <Text style={styles.text}>오늘하루는 어떠셨나요?</Text>
      </View>
      <Calendar />
      <View style={{ flex: 1, backgroundColor: basic_theme.bgColor, justifyContent: 'flex-end', flexDirection: 'row' }}>
        <Pressable style={styles.button} onPress={goWrite}>
          <FontAwesome5 name="pen" size={24} color="black" />
        </Pressable>
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
    fontSize: 17,
    fontWeight: '500',
    color: 'white',
    fontFamily: 'Gowun_Batang',
  },
  button: {
    margin: 20,
    backgroundColor: basic_theme.btnColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    marginBottom: 30,
    borderRadius: 35,
  },
});

export default HomeView;
