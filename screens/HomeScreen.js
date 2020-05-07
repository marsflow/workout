import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import { Image, Platform, 
  Keyboard,
  KeyboardAvoidingView,
  ToastAndroid,
  AsyncStorage,
  TextInput, 
  Button,  
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
import { getARMatrices } from 'expo/build/AR';


export default function HomeScreen() {

  const [restDuration, setRestDuration] = useState('0');


  const saveRest = async () => {

    try {

      await AsyncStorage.setItem('restDuration', restDuration); 
      ToastAndroid.show("Saved", ToastAndroid.SHORT);
      Keyboard.dismiss();
      console.log('dur saved', restDuration)

    } catch(error) {

      ToastAndroid.show("Some idiots make an error", ToastAndroid.SHORT);

    }
 
  }


  const getRestDuration = async () => {

    try {

      let rest = await AsyncStorage.getItem('restDuration');
      console.log('effect rest', rest)
      if (rest !== null) {
        console.log('get duration from file')
        setRestDuration(rest)
      } else {
        console.log('get duration from file null, set default')
        setRestDuration('120')
      }
          

    } catch(error) {
      
      ToastAndroid.show("Default rest duration: 120 seconds", ToastAndroid.SHORT);
      console.log('get duration from file error, set default')
      setRestDuration('120')

    }
    
  }

  useEffect(() => {

    getRestDuration()
    

   



  }, [])

  return (
    <View style={styles.container}>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>

          <KeyboardAvoidingView 
            behavior={Platform.OS == "ios" ? "padding" : "height"} 
            style={{alignItems: 'center', marginBottom: 10}}
          >

            <Text style={styles.getStartedText}>Input your resting time (second):</Text>
            
            <TextInput
              style={{ marginTop: 10, marginBottom: 10, height: 30, width: 100, textAlign: 'center', borderWidth: 1 }}
              keyboardType="numeric"
              onChangeText={(text) => setRestDuration(text)}
              value={restDuration}
            />

            <Button title="Save" onPress={() => saveRest()} color="blue" />

          </KeyboardAvoidingView>
          
          <Text style={styles.getStartedText}>Open up the code for this screen:</Text>

          <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <MonoText>screens/HomeScreen.js</MonoText>
          </View>

          <Text style={styles.getStartedText}>
            Change any of the text, save the file, and your app will automatically reload.
          </Text>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

        <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>navigation/BottomTabNavigator.js</MonoText>
        </View>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};




function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
