import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { Header } from "react-native-elements";
import db from "../config";
import firebase from "firebase";

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
  };

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
              this.submitStory();
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
    justifyContent: "center",
    alignItems: "center",
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
