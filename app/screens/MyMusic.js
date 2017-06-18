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

class MyMusicScreen extends React.Component {
  constructor(props){
    super()
  }

  static navigationOptions = {
  };

  componentWillMount(){
    
  }

  render() {

    return (
      <ScrollView style={styles.viewContainer}>
        <Text style={styles.title}>{this.props.music.type}</Text>
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


export default MyMusicScreen;
