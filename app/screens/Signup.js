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

class SignupScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      text: "",
      username: "",
      password: "",
      email: "",
      currentUser: null,
      errors: null}
  }

  static navigationOptions = {
    title: "SIGN UP",
    headerStyle:{ backgroundColor: 'black'},
    headerTitleStyle: {color: "white"}
  };

  _authenticate(){
    window.context = this;
    const user = {user: {username: this.state.username, password: this.state.password, email: this.state.email}}
    fetch("http://www.beathub.us/api/users", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(function(response){
        if (response.ok){
          response.json().then((responseJSON) => {
            window.context.setState({currentUser: window.context.state.username})
            window.context.props.navigation.navigate('UserHome', {currentUser: responseJSON})
          })
        } else {
          window.context.setState({errors: "Please fill in all fields"})
        }
      }).catch(function(error){
        console.log(`Got an error: ${error}`)
      })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: "https://s3.amazonaws.com/beathub-dev/songs/logo.png"}}
          style={styles.logo}/>

        <View style={styles.inputContainer}>
          <Icon
            name="envelope"
            style={styles.icon}/>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({email: text})}
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor="#ccc5c5"
            value={this.state.email}
            selectionColor="#1ac0ff"
            autoCapitalize="none"/>
        </View>


        <View style={styles.inputContainer}>
          <Icon
            name="user-circle"
            style={styles.icon}/>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({username: text})}
            placeholder="Choose username"
            placeholderTextColor="#ccc5c5"
            value={this.state.username}
            selectionColor="#1ac0ff"
            autoCapitalize="none"/>
        </View>

        <View style={styles.inputContainer}>
          <Icon
            name="lock"
            style={styles.icon}/>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({password: text})}
            placeholder="Choose password"
            placeholderTextColor="#ccc5c5"
            secureTextEntry={true}
            value={this.state.password}/>
        </View>

        <TouchableOpacity
          style={styles.loginContainer}
          onPress={() => this._authenticate()}>
          <Text style={styles.btnText}>SIGN UP</Text>
        </TouchableOpacity>

          <View style={{marginTop: 15}}>
            <Text style={styles.errors}>{this.state.errors ? this.state.errors : null}</Text>
          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#363636"
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    backgroundColor: "#242424",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    width: 373,
    textAlign: "left",
    paddingLeft: 50
  },
  errors: {
    color: "gray",
    fontSize: 20
  },
  logo: {
    height: 100,
    width: 100,
    marginTop: 30,
    marginBottom: 20
  },
  loginBtn: {
    backgroundColor: "#363636",
    width: 200,
    alignItems: "center",
    justifyContent: "center"
  },
  signupBtn: {
    backgroundColor: "#07d159",
    width: 180,
    alignItems: "center",
    justifyContent: "center"
  },
  btnText: {
    fontFamily: "Helvetica",
    color: "white",
    fontSize: 17,
    fontWeight: "bold"
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    fontSize: 20,
    zIndex: 2,
    color: "white",
    backgroundColor: "#242424",
    marginLeft: 10
  },
  loginContainer: {
    backgroundColor: "#07d159",
    width: 380,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  }
})


export default SignupScreen;
