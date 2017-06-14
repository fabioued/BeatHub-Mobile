import React from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import UserHomeScreen from './app/screens/UserHomeScreen';
import VideoPlayer from './app/components/VideoPlayer';
import LoginScreen from './app/screens/Login';
import SignupScreen from './app/screens/Signup';
import Carousel from 'react-native-looped-carousel';
import ArtistScreen from './app/screens/ArtistScreen'

const { width, height } = Dimensions.get('window');

class HomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {text: "", username: "", password: "", currentUser: null, errors: null, size: {width, height}}
  }

  static navigationOptions = {
    headerMode: 'screen',
    header: null
  };



  _authenticate(){
    window.context = this;
    const user = {user: {username: this.state.username, password: this.state.password}}
    console.log(user)
    fetch("http://www.beathub.us/api/session", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(function(response){
        if (response.ok){
          window.context.setState({currentUser: window.context.state.username})
          window.context.props.navigation.navigate('UserHome', {
            currentUser: window.context.state.username,
            navigation: window.context.props.navigation})
        } else {
          window.context.setState({errors: "Invalid username or password!"})
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
        <Text style={styles.title}>BeatHub</Text>

        <VideoPlayer style={styles.video}/>

          <Carousel
            delay={2000}
            style={{height: 120, width: 373, marginTop: 330}}
            autoplay
            bullets={true}>
            <View
              style={[{backgroundColor: 'transparent'}, this.state.size, styles.carouselPanel]}>
              <Text style={styles.carouselTitle}>Welcome</Text>
              <Text style={styles.carouselText}>Sign up for free music on your phone, tablet, and computer.</Text>
            </View>
            <View
              style={[{backgroundColor: 'transparent'}, this.state.size, styles.carouselPanel]}>
              <Text style={styles.carouselTitle}>Browse</Text>
              <Text style={styles.carouselText}>Explore top tracks, new releases and the right playlist for every moment.</Text>
            </View>
            <View
              style={[{backgroundColor: 'transparent'}, this.state.size, styles.carouselPanel]}>
              <Text style={styles.carouselTitle}>Search</Text>
              <Text style={styles.carouselText}>Looking for that special album or artist? Just search and hit Play!</Text>
            </View>
            <View
              style={[{backgroundColor: 'transparent'}, this.state.size, styles.carouselPanel]}>
              <Text style={styles.carouselTitle}>Running</Text>
              <Text style={styles.carouselText}>Music that perfectly matches your temp.</Text>
            </View>
            <View
              style={[{backgroundColor: 'transparent'}, this.state.size, styles.carouselPanel]}>
              <Text style={styles.carouselTitle}>Your Library</Text>
              <Text style={styles.carouselText}>Save any song, album or artist to your own music collection.</Text>
            </View>
            </Carousel>

          <View style={styles.buttonsContainer}>
            <TouchableHighlight
              style={styles.loginBtn}
              onPress={() => navigate('Login')}>
              <Text style={styles.btnText}>LOG IN</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.signupBtn}
              onPress={() => navigate('Signup')}>
              <Text style={styles.btnText}>SIGN UP</Text>
            </TouchableHighlight>
          </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  textInput: {
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "#424141",
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  authHeaders: {
    fontSize: 20,
    marginTop: 20
  },
  errors: {
    color: "#ff68c3",
    fontWeight: "bold",
    fontSize: 20
  },
  video: {
    zIndex: -1
  },
  logo: {
    height: 100,
    width: 100,
    marginTop: 30
  },
  title: {
    fontFamily: "Helvetica",
    fontSize: 35,
    color: "white",
    fontWeight: "bold",
    position: "absolute",
    marginTop: 130
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
    fontWeight: "bold"
  },
  buttonsContainer: {
    flexDirection: "row",
    marginBottom: 0,
    alignSelf: "center",
    justifyContent: "center",
    height: 45,
    width: 500
  },
  carouselPanel: {
    alignItems: "center"
  },
  carouselTitle: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Helvetica",
    color: "white"
  },
  carouselText: {
    textAlign: "center",
    color: "#ececec",
    fontFamily: "Helvetica",
    fontSize: 14,
    width: 300
  }
})

const BeatHub = StackNavigator({
  Home: { screen: HomeScreen },
  UserHome: { screen: UserHomeScreen },
  Login: { screen: LoginScreen},
  Signup: { screen: SignupScreen},
  Artist: { screen: ArtistScreen}
});

AppRegistry.registerComponent('BeatHub', () => BeatHub);
