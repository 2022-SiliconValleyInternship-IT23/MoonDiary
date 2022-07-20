import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { basic_theme } from '../../theme';
import { FontAwesome5 } from '@expo/vector-icons';
import Calendar from '../../components/Calendar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { axios_post } from '../../api/api';
import AppLoading from 'expo-app-loading';
import UserContext from '../../service/UserContext';

const HomeView = ({ navigation }) => {
  const [userName, setUserName] = useState(); //사용자 로그인시 state 관리 필요할 코드
  const [isLoading, setLoading] = useState(false);
  const [diaryData, setDiaryData] = useState([]);
  const userContext = useContext(UserContext);
  const getDiaryData = async () => {
    try {
      const userId = userContext.userId.replace('"', '').replace('"', '');
      const response = await axios_post('diary', { userId });
      if (response.status === 200) {
        var data = response.data;
        setDiaryData(() => data);
        // data는 Object를 원소로 가지는 Array
      }
      setLoading(true);
    } catch (e) {
      console.log('메인통신에러 : ' + e);
    }
  };
  useEffect(() => {
    getDiaryData();
    AsyncStorage.getItem('name').then((value) => {
      value && setUserName(value + '님');
    });
  }, []);
  const goWrite = () => {
    navigation.navigate('WriteDiaryView');
  };
  return isLoading ? (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ ...styles.text, marginTop: 40 }}>안녕하세요, {userName}</Text>
        <Text style={styles.text}>오늘 하루는 어떠셨나요?</Text>
      </View>
      <Calendar diaryData={diaryData} />
      <View style={{ flex: 1, backgroundColor: basic_theme.bgColor, justifyContent: 'flex-end', flexDirection: 'row' }}>
        <Pressable style={styles.button} onPress={goWrite}>
          <FontAwesome5 name="pen" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  ) : (
    <AppLoading />
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
    backgroundColor: basic_theme.btnColor2,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    marginBottom: 30,
    borderRadius: 35,
  },
});

export default HomeView;
