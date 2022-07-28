import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, Dimensions, TextInput, LogBox } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { basic_theme, month, weather_list, text } from '../../theme';
import { getWeatherRequire } from '../../service/SelectImage';
import { MaterialIcons } from '@expo/vector-icons';
import UserContext from '../../service/UserContext';
import { ModalWindow } from '../../components/ModalWindow';
import styled, { css } from 'styled-components/native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const WriteDiaryView = ({ navigation, route }) => {
  const userContext = useContext(UserContext);
  const [year, setYear] = useState(new Date().getFullYear());
  const [mon, setMon] = useState(new Date().getMonth());
  const [day, setDay] = useState(new Date().getDate());
  const [date, setDate] = useState(year + '-' + (mon + 1) + '-' + day);
  const [weather, setWeather] = useState('sunny');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [titleModal, setTitleModal] = useState(false);
  const [contentModal, setContentModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [goAnalysisModal, setGoAnalysisModal] = useState(false);
  const [correctionModal, setCorrectionModal] = useState(false);
  const [tipModal, setTipModal] = useState(false);
  useEffect(() => {
    if (route.params.diaryId !== null) {
      setTitle(route.params.title);
      setContents(route.params.contents);
      setWeather(route.params.weather);
      setDate(route.params.date);
      setYear(route.params.date.slice(0, 4));
      setMon(Number(route.params.date.slice(6, 8)) - 1);
      setDay(route.params.date.slice(10, 12));
    }
  }, []);
  const goAnalysis = async () => {
    const userId = userContext.userId;
    const userName = userContext.userName;
    const imageYN = userContext.imageYN;
    const commentYN = userContext.commentYN;
    setTitle(title.trim());
    setContents(contents.trim());
    setGoAnalysisModal(false);
    navigation.navigate('AnalysisLoadingView', {
      userId,
      date,
      weather,
      title,
      contents,
      imageYN,
      commentYN,
      name: userName,
      month: month[mon],
      day,
    });
  };
  const correctDiary = () => {
    setCorrectionModal(false);
    navigation.goBack();
  };
  const submitDiaryData = () => {
    //제목을 작성하지 않은 경우
    if (!title.trim()) {
      setTitleModal(true);
    }
    //일기를 3문장 이상 작성하지 않은 경우
    else if (contents.split('.' || '?' || '!').filter((sents) => sents.trim() !== '').length < 3) {
      setContentModal(true);
    } else {
      route.params.diaryId ? setCorrectionModal(true) : setGoAnalysisModal(true);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={style.container} scrollEnabled={false}>
      <View style={style.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="home" size={35} color="white" />
        </TouchableOpacity>
        <T font={userContext.userFont} size={22} date={true}>
          {month[mon]} {day}
        </T>
      </View>
      <View style={style.weatherConatiner}>
        <T font={userContext.userFont} size={17}>
          {route.params.diaryId === null ? '오늘의 ' : null}날씨
        </T>
        {weather_list.map((weather_txt, index) => (
          <TouchableOpacity onPress={() => setWeather(weather_txt)} style={style.weatherIMG} key={index}>
            <Image
              source={getWeatherRequire(weather_txt)}
              style={weather == weather_txt ? style.weatherSelected : style.weatherNotSelected}
            ></Image>
          </TouchableOpacity>
        ))}
      </View>
      <View style={style.questionContainer}>
        <Image source={require('../../assets/img/moon.png')} style={style.smallMoon}></Image>
        <View style={style.questionBox}>
          <T font={userContext.userFont} size={17}>
            {userContext.userName}님,
          </T>
          <T font={userContext.userFont} size={17} paddingTop={2}>
            {route.params.diaryId === null ? '오늘의 하루는 어땠는지 알려주세요.' : '수정할 내용을 입력하세요.'}
          </T>
        </View>
      </View>
      <View style={style.titleContainer}>
        <T font={userContext.userFont} size={17}>
          제목
        </T>
        <TextInput
          value={title}
          placeholder="제목을 입력해주세요"
          onChangeText={setTitle}
          style={[style.titleInputBox, { fontFamily: userContext.userFont }]}
        ></TextInput>
      </View>
      <TextInput
        value={contents}
        multiline={true}
        placeholder={'내용을 작성해주세요'}
        onChangeText={setContents}
        style={[style.contentContainer, { fontFamily: userContext.userFont }]}
      ></TextInput>
      <View style={style.buttonContainer}>
        <TouchableOpacity onPress={() => setCancelModal(true)} activeOpacity={0.7} style={style.button1}>
          <T font={userContext.userFont} size={14}>
            {route.params.diaryId ? '수정 취소' : '작성 취소'}
          </T>
        </TouchableOpacity>
        <TouchableOpacity onPress={submitDiaryData} activeOpacity={0.7} style={style.button2}>
          <T font={userContext.userFont} size={14}>
            {route.params.diaryId ? '수정 완료' : '작성 완료'}
          </T>
        </TouchableOpacity>
      </View>
      <ModalWindow
        open={titleModal}
        okPress={() => setTitleModal(false)}
        text1="앗! 아직 제목이 작성되지 않았네요."
        text2="제목을 작성해주세요."
        confirmText={text.backText}
        font={userContext.userFont}
      />
      <ModalWindow
        open={contentModal}
        okPress={() => setContentModal(false)}
        cancelPress={() => {
          setContentModal(false);
          setTipModal(true);
        }}
        text1="앗! 3문장 이상 작성해주셔야"
        text2="제가 일기를 분석할 수 있어요."
        confirmText={text.backText}
        cancelText="Tip"
        font={userContext.userFont}
      />
      <ModalWindow
        open={cancelModal}
        okPress={() => navigation.goBack()}
        cancelPress={() => setCancelModal(false)}
        text1="변경사항이 저장되지 않습니다."
        text2="작성을 취소하시겠습니까?"
        confirmText={text.confirmText}
        cancelText={text.deniedText}
        font={userContext.userFont}
      />
      <ModalWindow
        open={goAnalysisModal}
        okPress={goAnalysis}
        cancelPress={() => setGoAnalysisModal(false)}
        text2="일기를 모두 작성하셨나요?"
        confirmText={text.confirmText}
        cancelText={text.deniedText}
        font={userContext.userFont}
      />
      <ModalWindow
        open={tipModal}
        okPress={() => setTipModal(false)}
        title=" ✨ TIP ✨"
        text1="문장의 끝에 . 또는 ! 또는 ?을 적으면"
        text2="문장으로 인식됩니다."
        confirmText={text.backText}
        font={userContext.userFont}
      />
      <ModalWindow
        open={correctionModal}
        okPress={correctDiary}
        text2="일기가 수정되었습니다."
        confirmText={text.backText}
        font={userContext.userFont}
      />
    </KeyboardAwareScrollView>
  );
};
const T = styled.Text`
  font-size: ${(props) => props.size}px;
  font-family: ${(props) => props.font};
  color: white;
  padding-top: ${(props) => props.paddingTop || 0}px;
  ${(props) =>
    props.date &&
    css`
      align-self: center;
      border-bottom-width: 1px;
      border-bottom-color: #fff;
    `};
`;
const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: basic_theme.bgColor,
    padding: 25,
  },
  headerContainer: {
    height: 60,
    width: Dimensions.get('window').width - 50,
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    marginTop: 25,
  },
  weatherConatiner: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  questionContainer: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleContainer: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentContainer: {
    height: Dimensions.get('window').height - 340,
    width: Dimensions.get('window').width - 50,
    textAlignVertical: 'top',
    color: basic_theme.darkBlue,
    fontSize: 17,
    borderWidth: 1,
    borderColor: basic_theme.blue,
    backgroundColor: basic_theme.fgColor,
    marginVertical: 10,
    padding: 20,
  },
  buttonContainer: {
    height: 45,
    alignSelf: 'stretch',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  text: {
    fontSize: 17,
    fontFamily: 'Gowun_Batang',
    color: 'white',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'Gowun_Batang',
    color: 'white',
  },
  button1: {
    backgroundColor: basic_theme.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    flex: 1,
    width: 100,
  },
  button2: {
    backgroundColor: basic_theme.subColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    flex: 1,
    width: 100,
  },
  date: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  weatherIMG: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherSelected: {
    width: 35,
    height: 35,
  },
  weatherNotSelected: {
    width: 26,
    height: 26,
    opacity: 0.5,
  },
  smallMoon: {
    width: 30,
    height: 30,
  },

  questionBox: {
    marginLeft: 15,
  },

  titleInputBox: {
    fontSize: 17,
    marginLeft: 15,
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    flex: 1,
  },
});

export default WriteDiaryView;
