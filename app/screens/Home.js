import React from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'

class HomeScreen extends React.Component {
  constructor(props){
    super(props)

  }

  static navigationOptions = {
    header: null
  };



  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.title}>HOME</Text>

        <TouchableOpacity
          style={{backgroundColor: "green"}}
          onPress={() => this.props._setAudioBar()}>
          <Text style={{color: "white"}}>SET AUDIO BAR</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
    fontSize: 16,
    fontFamily: "Helvetica",
    color: "white",
    alignSelf: "center"
  }
})


export default HomeScreen;
