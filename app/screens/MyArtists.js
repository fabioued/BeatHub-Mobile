import React from 'react';
import {
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
import Icon from 'react-native-vector-icons/FontAwesome';

class MyArtistsScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {artists: null}
    this.renderArtists = this.renderArtists.bind(this);
  }

  componentWillMount(){
    fetch(`http://www.beathub.us/api/users/${this.props.currentUser.id}/followed_artists`, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({artists: responseJSON})
      }).catch(function(error){
        console.log(`Got an error: ${error}`)
      })
  }


  goBack(){
    this.props.changeTab(null, null, 'pop')
  }

  _renderLoading(){
    return (
      <ActivityIndicator
        animating={this.state.animating}
        style={{height: 80}}
        size="large"
        />
    )
  }

  renderArtists(){
    let artists = this.state.artists.collection.map((artist, idx) => {
      return (
        <TouchableOpacity
          key={idx}
          style={styles.artistRow}
          onPress={() => this.props.changeTab('artist', artist, 'push')}
          >
          <Image
            style={styles.artistImage}
            source={{uri: artist.image_url}}/>
          <Text style={styles.artistName}>{artist.name}</Text>
          <Icon
            name="chevron-right"
            size={20}
            style={styles.arrow}
          />

        </TouchableOpacity>
      )
    })

    return (
      <View style={styles.artistsContainer}>
        {artists}
      </View>
    )
  }


  render(){
    let artists = this.state.artists ? this.renderArtists() : this._renderLoading();
    return (
      <ScrollView>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.goBack()}>
          <Icon
            name="chevron-left"
            size={20}
            style={styles.itemIcon}
            />
        </TouchableOpacity>

        <Text style={styles.title}>My Artists</Text>
        {artists}

      </ScrollView>

    )
  }

}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: "Helvetica",
    color: "white",
    alignSelf: "center",
    marginTop: 25
  },
  itemIcon: {
    color: "white",
    zIndex: 10,
    backgroundColor: "transparent"
  },
  backButton :{
    position: 'absolute',
    top: 25,
    left: 10,
    zIndex: 9
  },
  artistRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    height: 30,
    marginTop: 30,
    marginLeft: 20
  },
  artistImage: {
    borderRadius: 25,
    height: 50,
    width: 50
  },
  artistName: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    fontSize: 15,
    marginLeft: 30
  },
  arrow: {
    position: "absolute",
    color: "#585757",
    backgroundColor: "transparent",
    right: 10
  }
})

export default MyArtistsScreen;
