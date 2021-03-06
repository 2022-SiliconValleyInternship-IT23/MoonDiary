import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { basic_theme } from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { axios_get, axios_post } from '../../api/api';
import { getEmtionRequire } from '../../service/SelectImage';

const AnalysisLoadingView = ({ navigation, diaryId }) => {
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [emotions, setEmotions] = useState(['angry', 'joy', 'love']);
  const [selectedEmotion, setSelectedEmotion] = useState();

  AsyncStorage.getItem('userId') //로그인확인
    .then((value) => setUserId(value))
    .catch((e) => navigation.replace('LoginView'));

  useEffect(() => {
    (async () => {
      const response = await axios_get('selectEmotion', { userId });
      if (response.status == 200) {
        if (response.data.emotions.length == 1) {
          submitEmotionData(emotions[0]);
          return;
        }
        //감정이 여러개일때
        setIsLoading(false);
        setEmotions([...response.data.emotions]); //감정 받아오기
      }
    })();
  }, []);

  const submitEmotionData = async (emotion) => {
    setSelectedEmotion(emotion);
    const response = await axios_post('selectEmotion', { userId, diaryId, emotion });
    if (response.status == 201) {
      navigation.replace('AnalysisResultView', {
        diaryId: {
          /**diaryId reponse 받은 diaryId */
        },
      });
    }
  };

  return (
    <View style={style.container}>
      <Modal backdropOpacity={0} isVisible={!isLoading} style={style.modalContainer}>
        <View style={style.modalBox}>
          <Text style={style.text}>여러개의 감정이 느껴지시네요!</Text>
          <Text style={style.text}>오늘을 대표하는 감정 1개를 선택해주세요.</Text>
          <View style={style.emotionContainer}>
            {emotions.map((emotion) => (
              <TouchableOpacity onPress={() => setSelectedEmotion(emotion)} style={style.emotionBox}>
                <Image
                  source={getEmtionRequire(emotion)}
                  style={selectedEmotion === emotion ? null : style.emotion}
                ></Image>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity onPress={() => submitEmotionData(selectedEmotion)}>
          <Text style={style.text}>OK</Text>
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity onPress={() => navigation.replace('BottomTabHome')} style={style.homeBox}>
        <Image source={'../assets/img/home.png'} style={style.home}></Image>
      </TouchableOpacity>
      <View style={style.dateBox}>
        <Text style={dateStyle}>
          {'June 22'}
          {/*date*/}
        </Text>
      </View>
      <View style={style.commentContainer}>
        <Text style={style.boldText}>
          {/**username */}
          {'홍길동님,'}
        </Text>
        <Text style={style.boldText}>{'오늘 하루도 수고 많았어요'} </Text>
      </View>
      <View style={style.loadingContainer}>
        <Image source={require('../../assets/img/loading.gif')} style={style.loading}></Image>
      </View>
      {isLoading ? (
        <View style={style.loadingCommentContainer}>
          <Text style={style.text}>{'AI가 일기를 분석중입니다.'}</Text>
        </View>
      ) : (
        <View style={style.loadingCommentContainer}>
          <Text style={style.text}>{'분석이 완료되었습니다'}</Text>
        </View>
      )}

      <View style={style.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} style={style.buttonBox}>
          <Text style={style.smallText}>{'수정하기'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
  },
  container: {
    flex: 1,
    backgroundColor: basic_theme.bgColor,
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: 'Gowun_Batang',
    color: 'white',
    marginVertical: 2,
  },
  text: {
    fontSize: 17,
    fontFamily: 'Gowun_Batang',
    color: 'white',
    marginVertical: 2,
  },
  smallText: {
    fontSize: 14,
    fontFamily: 'Gowun_Batang',
    color: 'white',
    marginVertical: 2,
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 120,
  },

  buttonBox: {
    marginHorizontal: 12,
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

  date: {
    fontSize: 22,
    height: 27,
  },
  dateBox: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    // shadowColor: '#000', //그림자 설정
    // shadowOpacity: 0.5,
    // shadowOffset: {
    //   height: 4,
    // },
  },
  home: {
    width: 35,
    height: 35,
  },
  homeBox: {
    marginTop: Dimensions.get('window').height / 18,
    width: Dimensions.get('window').width / 1.2,
    alignItems: 'flex-end',
    height: 35,
  },
  commentContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    marginTop: 70,
    height: Dimensions.get('window').width / 1.7,
    width: Dimensions.get('window').width / 1.7,
  },

  loadingCommentContainer: {
    marginTop: 40,
  },
  loading: {
    height: Dimensions.get('window').width / 1.7,
    width: Dimensions.get('window').width / 1.7,
  },
  modalContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width / 1.05,
    height: Dimensions.get('window').height / 3,
    top: Dimensions.get('window').height / 3.8,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#303B62',
    alignItems: 'center',
  },
  modalBox: {
    alignItems: 'center',
  },

  emotionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emotionBox: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 15,
  },
  emotion: { opacity: 0.5 },
  selectedEmotion: {},

  emotionButtonBox: {},
});

const dateStyle = StyleSheet.compose(style.text, style.date);
export default AnalysisLoadingView;
