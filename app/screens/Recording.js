import React, { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

export default function Recording() {
  ////////////// start recording
  const [recording, setRecording] = React.useState();
  const [lastUri, setLastUri] = useState("");

  const startRecording = async () => {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };
  ///////// stop recording
  const stopRecording = async () => {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    setLastUri(recording.getURI());

    console.log("Recording stopped and stored at", lastUri);
  };
  ////////// playing sounds
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
  const [list, setList] = useState([]);
  const klik = () => {
    let dir = FileSystem.cacheDirectory;
    FileSystem.readDirectoryAsync(dir + "/AV/").then((resp) => setList(resp));
  };

  return (
    <View style={stylesRec.container}>
      <Text style={stylesRec.icons}>How long You want to record?</Text>

      <View style={stylesRec.iconContainer}>
        <TouchableOpacity style={stylesRec.iconRec}>
          <View onTouchEnd={startRecording} style={stylesRec.dotRec}></View>
        </TouchableOpacity>
        <TouchableOpacity style={stylesRec.iconRec}>
          <Text
            onTouchEnd={stopRecording}
            style={(stylesRec.icons, stylesRec.iconDown)}
          >
            stop
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesRec.iconRec}>
          <Text
            onTouchEnd={playSound}
            style={(stylesRec.icons, stylesRec.iconDown)}
          >
            play
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesRec.iconRec}>
          <Text onTouchEnd={klik} style={(stylesRec.icons, stylesRec.iconDown)}>
            list
          </Text>
        </TouchableOpacity>
      </View>
      {list ? (
        list.map((el, i) => {
          return (
            <Text style={stylesRec.text} key={i}>
              {el}
            </Text>
          );
        })
      ) : (
        <Text>Brak</Text>
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
