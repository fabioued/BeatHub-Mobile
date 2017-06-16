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
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'

class RadioScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    this._renderLoading = this._renderLoading.bind(this);
  }

  static navigationOptions = {
    header: null
  };


  _renderLoading(){
    return (
      <ActivityIndicator
        animating={this.state.animating}
        style={{height: 120}}
        size="large"
        />
    )
  }

  _renderMusicIcon() {
    return (
      <Icon
        name="music"
        size={170}
        style={styles.itemIcon}
        />
    )
  }

  render() {
    let fetchingSongs = this.props.fetchingSongs ? <Text style={styles.fetchText}>Finding music for you...</Text> : null
    let icon = this.props.fetchingSongs ? this._renderLoading() : this._renderMusicIcon()

    return (
      <ScrollView>
        <Text style={styles.title}>Radio</Text>

        <View style={styles.background}>

          <View style={styles.circle}>
            {icon}
          </View>
          <View style={{marginTop: 10}}>
            {fetchingSongs}
          </View>
        </View>


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    marginTop: 20,
    fontSize: 26,
    fontFamily: "Helvetica",
    color: "white",
    alignSelf: "center"
  },
  itemIcon: {
    color: "white",
    alignSelf: "center",
    backgroundColor: "transparent"
  },
  background: {
    backgroundColor: "#1e356b",
    height: 450,
    alignSelf: "stretch",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50
  },
  circle: {
    backgroundColor: "black",
    height: 250,
    width: 250,
    borderRadius: 125,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  fetchText: {
    color: 'white',
    fontSize: 18,
    fontFamily: "Helvetica",
  }
})


export default RadioScreen;
