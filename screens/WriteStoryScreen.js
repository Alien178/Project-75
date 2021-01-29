import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { Header } from "react-native-elements";
import db from "../config";
import firebase from "firebase";
import { Alert } from "react-native";
import updateStories from "./ReadStoryScreen";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class WriteStoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      author: "",
      title: "",
      story: "",
    };
  }

  submitStory = async () => {
    db.collection("stories").add({
      title: this.state.title,
      author: this.state.author,
      story: this.state.story,
      date: firebase.firestore.Timestamp.now().toDate(),
    });
    Alert.alert("Your Story Has Been Submitted");
    this.setState({
      author: "",
      title: "",
      story: ""
    })
  };

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  submit_updateStories = async () => {
    this.submitStory();
    sleep(2000).then(() => { updateStories() });
  }

  render() {
    return (
      <KeyboardAvoidingView style = {styles.container} behavior={"padding"} enabled>
        <View >
          <Header
            centerComponent={{
              text: "Writing Hub",
              style: { color: "white", fontSize: 20, fontWeight: "bold" },
            }}
            backgroundColor={"purple"}
          />
        </View>
        <View>
          <TextInput
            style={styles.titleInputBox}
            placeholder="Title of the Story"
            placeholderTextColor="white"
            value = {this.state.title}
            onChangeText={(text) => {
              this.setState({
                title: text,
              });
            }}
          />
        </View>
        <View>
          <TextInput
            style={styles.authorInputBox}
            placeholder="Name of the Author"
            placeholderTextColor="white"
            value = {this.state.author}
            onChangeText={(text) => {
              this.setState({
                author: text,
              });
            }}
          />
        </View>
        <View>
          <TextInput
            style={styles.storyInputBox}
            multiline
            numberOfLines={30}
            placeholder="Write your Story Here"
            placeholderTextColor="white"
            value = {this.state.story}
            onChangeText={(text) => {
              this.setState({
                story: text,
              });
            }}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => {
              this.submit_updateStories();
            }}
          >
            <Text style={styles.sendButtonText}>Send Story</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#462173",
  },

  titleInputBox: {
    marginTop: 15,
    width: 350,
    borderWidth: 4,
    alignSelf: "center",
    height: 50,
    textAlign: "center",
    borderRadius: 5,
    fontWeight: "bold",
    fontSize: 24,
    borderColor: "#5D2C99",
    backgroundColor: "#7537BF",
    color: "white",
  },
  authorInputBox: {
    marginTop: 15,
    width: 350,
    borderWidth: 4,
    alignSelf: "center",
    height: 50,
    textAlign: "center",
    borderRadius: 5,
    fontWeight: "bold",
    fontSize: 20,
    borderColor: "#5D2C99",
    backgroundColor: "#7537BF",
    color: "white",
  },
  storyInputBox: {
    marginTop: 15,
    width: 350,
    borderWidth: 4,
    alignSelf: "center",
    height: 350,
    borderRadius: 5,
    fontWeight: "bold",
    fontSize: 17,
    textAlignVertical: "top",
    textAlign: "auto",
    paddingHorizontal: 5,
    borderColor: "#5D2C99",
    backgroundColor: "#7537BF",
    color: "white",
  },
  sendButton: {
    marginTop: 15,
    width: 150,
    borderWidth: 3,
    alignSelf: "center",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#009604",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#005604",
  },

  sendButtonText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
