import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import ReactTimeout from "react-timeout";

export default function Recording() {
  ////////////// start recording
  const [recording, setRecording] = React.useState();
  const [lastUri, setLastUri] = useState("");
  const [list, setList] = useState([]);
  const [recInterval, setRecInterval] = useState({});

  useEffect(() => {
    let dir = FileSystem.cacheDirectory;
    FileSystem.readDirectoryAsync(dir + "/AV/").then((resp) => setList(resp));
    setList();
    return () => {
      setList([]);
    };
  }, []);

  const startRecording = async () => {
    //////starting recording ////////////
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
      });
      console.log("Starting recording..");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
      console.log("Recording started");
      /////// stopping recording chunks
      setRecInterval(
        setInterval(() => {
          setRecording(undefined);
          console.log("Stopping recording..");
          recording.stopAndUnloadAsync();
          setLastUri(recording.getURI());
          console.log("Recording stopped and stored at", lastUri);
          ////set timeout top/start
          setTimeout(async () => {
            console.log("Requesting permissions..");
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
              allowsRecordingIOS: true,
              playsInSilentModeIOS: true,
              staysActiveInBackground: true,
            });
            console.log("Starting recording..");
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(
              Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY
            );
            await recording.startAsync();
            setRecording(recording);
            console.log("Recording started");
          }, 3000);
        }, 10000)
      );
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = () => {
    clearInterval(recInterval);

    setRecording(undefined);
    console.log("Stopping recording..");
    recording.stopAndUnloadAsync();
    setLastUri(recording.getURI());
    console.log("Recording stopped and stored at", lastUri);
  };

  ////////////////// playing sounds //////////
  const [sound, setSound] = React.useState();

  const playSound = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: lastUri,
      },
      { shouldPlay: true }
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  };

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  /////////// console log zawartosc folderu

  const klik = () => {
    FileSystem.deleteAsync(FileSystem.cacheDirectory + "/AV/");
  };

  return (
    <View style={stylesRec.container}>
      <Text style={stylesRec.icons}>How long do You want to record?</Text>

      <View style={stylesRec.iconContainer}>
        <TouchableOpacity style={stylesRec.iconRec}>
          <View onTouchStart={startRecording} style={stylesRec.dotRec}></View>
        </TouchableOpacity>
        <TouchableOpacity style={stylesRec.iconRec}>
          <Text
            onPress={stopRecording}
            style={(stylesRec.icons, stylesRec.iconDown)}
          >
            stop
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesRec.iconRec}>
          <Text
            onPress={playSound}
            style={(stylesRec.icons, stylesRec.iconDown)}
          >
            play
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesRec.iconRec}>
          <Text onPress={klik} style={(stylesRec.icons, stylesRec.iconDown)}>
            delete rec
          </Text>
        </TouchableOpacity>
      </View>
      {list ? (
        list.map((el, i) => {
          return (
            <View key={i}>
              <Text style={stylesRec.text}>{el}</Text>
            </View>
          );
        })
      ) : (
        <Text style={stylesRec.text}>No recordings</Text>
      )}
    </View>
  );
}

const stylesRec = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    width: "90%",
    borderRadius: 20,
    backgroundColor: "black",
    opacity: 0.7,
  },
  iconContainer: {
    flexDirection: "row",
    alignSelf: "center",

    alignItems: "center",
  },
  icons: {
    color: "white",
    fontSize: 20,
    fontWeight: "200",
  },
  text: {
    color: "white",
    fontSize: 10,
    fontWeight: "200",
  },
  iconRec: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    margin: 10,
  },
  dotRec: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 100,
  },
  iconDown: {
    color: "white",
    fontSize: 30,
  },
});
