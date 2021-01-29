import * as React from "react";
import { Header, SearchBar } from "react-native-elements";
import { View, StyleSheet, Text, FlatList, Alert, Dimensions, } from "react-native";
import db from "../config";
import { TouchableOpacity } from "react-native-gesture-handler";

const windowWidth = Dimensions.get('window').width;

export const updateStories = function() {
    this.retrieveStories()
}

export default class ReadStoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      allStories: [],
      search: "",
      dataSource: [],
    };
  }

  updateSearch = (search) => {
    this.setState({ search: search });
  };

  searchFilter = (text) => {
    const newData = this.state.allStories.filter((item) => {
      const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  };

  retrieveStories = async () => {
    try {
      var stories = [];
      console.log(windowWidth)
      db.collection("stories")
        .get()
        .then((story) => {
          story.forEach((doc) => {
            stories.push(doc.data());
          });
          this.setState({ allStories: stories });
          this.setState({ dataSource: stories });
        });
    } catch (error) {
      Alert.alert(error);
    }
  };

  componentDidMount() {
    this.retrieveStories();
  }


  clean_update = async () => {
    this.searchFilter("")
    this.retrieveStories();
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: "Writing Hub",
            style: { color: "white", fontSize: 20, fontWeight: "bold" },
          }}
          backgroundColor={"purple"}
        />
        <View style={styles.searchBar}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={(text) => this.searchFilter(text)}
            onClear={(text) => this.clean_update()}
            value={this.state.search}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => {
              this.retrieveStories();
            }}
          >
            <Text style={styles.sendButtonText}>Reload</Text>
          </TouchableOpacity>
        </View>
          <FlatList
            data={
              this.state.search === ""
                ? this.state.allStories
                : this.state.dataSource
            }
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style = {{paddingHorizontal: 3, fontWeight: "bold"}}>Title: {item.title}</Text>
                <Text style = {{paddingHorizontal: 3, fontWeight: "bold"}}>Author : {item.author}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    height: 80,
    width: windowWidth,
    borderWidth: 3,
    borderColor: "#005085",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#0088E3",
  },
  sendButton: {
    width: windowWidth,
    borderWidth: 3,
    alignSelf: "center",
    height: 50,
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
