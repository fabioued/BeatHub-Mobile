import React from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Foundation'

class LibraryScreen extends React.Component {
  constructor(props){
    super()
  }

  static navigationOptions = {
  };

  render() {

    return (
      <ScrollView style={styles.viewContainer}>
        <Text style={styles.title}>YOUR LIBRARY</Text>

        <TouchableOpacity
          style={styles.musicItem}
          onPress={() => this.props.changeTab('playlists', null, 'push')}>
          <Icon
            name="music"
            size={30}
            style={styles.itemIcon}
          />
          <Text
            style={styles.musicText}>
            Playlists
          </Text>
          <Icon
            name="chevron-right"
            size={20}
            style={styles.arrow}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.musicItem}>
          <Icon2
            name="sound"
            size={30}
            style={styles.itemIcon}
          />
          <Text style={styles.musicText}>Songs</Text>
          <Icon
            name="chevron-right"
            size={20}
            style={styles.arrow}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.musicItem}>
          <Icon2
            name="record"
            size={30}
            style={styles.itemIcon}
          />
          <Text style={styles.musicText}>Albums</Text>
          <Icon
            name="chevron-right"
            size={20}
            style={styles.arrow}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.musicItem}>
          <Icon2
            name="microphone"
            size={30}
            style={styles.itemIcon}
          />
          <Text style={styles.musicText}>Artists</Text>
          <Icon
            name="chevron-right"
            size={20}
            style={styles.arrow}
          />
        </TouchableOpacity>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  title: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: "Helvetica",
    color: "white",
    alignSelf: "center"
  },
  musicItem: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    height: 30,
    marginTop: 20,
    marginLeft: 20
  },
  musicText: {
    color: "white",
    fontWeight: "bold",
    fontFamily: "Helvetica",
    fontSize: 20,
    marginLeft: 20
  },
  itemIcon: {
    color: "#585757",
    backgroundColor: "transparent"
  },
  arrow: {
    position: "absolute",
    color: "#585757",
    backgroundColor: "transparent",
    right: 10
  }
})


export default LibraryScreen;
