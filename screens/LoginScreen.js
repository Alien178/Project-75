import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
  Alert,
} from "react-native";
import db from "../config";
import firebase from "firebase";

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailID: "",
      password: "",
    };
  }

  login = async (emailID, password) => {
    if (emailID && password) {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(emailID, password);
        if (response) {
          this.props.navigation.navigate("WriteStory");
        }
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            Alert.alert("User Not Found");
            break;
          case "auth/invalid-email":
            Alert.alert("Incorrect Email ID");
            break;
        }
      }
    } else {
      Alert.alert("Please Enter Email ID/Password");
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{ alignItems: "center", flex: 1, backgroundColor: "#5ED7FF" }}
        behavior={"padding"}
        enabled
      >
        <View>
          <Image
            source={require("../assets/booklogo.png")}
            style={{ width: 200, height: 200, marginTop: 40 }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            Bedtime Stories
          </Text>
        </View>
        <View>
          <TextInput
            placeholder={"Email ID"}
            style={styles.loginBox}
            keyboardType={"email-address"}
            onChangeText={(text) => {
              this.setState({
                emailID: text,
              });
            }}
          ></TextInput>
          <TextInput
            placeholder={"Password"}
            style={styles.loginBox}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          ></TextInput>
        </View>
        <View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              this.login(this.state.emailID, this.state.password);
            }}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  loginBox: {
    width: 300,
    height: 40,
    borderWidth: 4,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
    borderColor: "#2A5F70",
    fontWeight: "bold",
    borderRadius: 5,
    marginTop: 20,
  },

  loginButton: {
    height: 50,
    width: 150,
    marginTop: 20,
    paddingTop: 5,
    borderRadius: 7,
    backgroundColor: "#44B399",
    justifyContent: "center",
    borderWidth: 4,
    borderRadius: 5,
    borderColor: "#31826F",
  },

  loginButtonText: {
    color: "#61FFDA",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },

  creditText: {
    color: "#85010F",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
