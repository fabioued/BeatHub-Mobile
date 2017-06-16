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
  findNodeHandle,
  ActivityIndicator
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome'
import TabBar from '../components/TabBar';
import { BlurView, VibrancyView } from 'react-native-blur';

class ArtistScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      viewRef: null,
      blurAmount: 8,
      scrollPos: 0,
      showThumb: true,
      albums: null,
      followed: false
    }
    this.goBack = this.goBack.bind(this)
    this.handleScroll = this.handleScroll.bind(this);
    this.reBlur = this.reBlur.bind(this);
    this.renderThumb = this.renderThumb.bind(this);
    this.renderAlbums = this.renderAlbums.bind(this);
    this.fetchArtistAlbums = this.fetchArtistAlbums.bind(this);
    this.checkFollow = this.checkFollow.bind(this);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
    this.toggleFollow = this.toggleFollow.bind(this);
  }

  static navigationOptions = {
  };

  componentWillMount(){
    this.fetchArtistAlbums()
    this.checkFollow()
  }

  fetchArtistAlbums(){
    fetch(`http://www.beathub.us/api/artists/${this.props.artist.id}/albums`, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({albums: responseJSON})
      }).catch(function(error){
        console.log(`Got an error: ${error}`)
      })
  }

  goBack(){
    this.props.changeTab(null, null, 'pop')
  }

  imageLoaded(){
    this.setState({viewRef: findNodeHandle(this.backgroundImage)});
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

  handleScroll(e){
    let offset = e.nativeEvent.contentOffset.y
    let scrollPos = this.state.scrollPos;

    if (offset < scrollPos) {
      if (offset < 0){
        let blurAmount = this.state.blurAmount <= 0 ? 0 : this.state.blurAmount -= 1
        this.setState({blurAmount: blurAmount, scrollPos: offset, showThumb: false})
      } else if (offset >= 0){
        let blurAmount = this.state.blurAmount >= 8 ? 8 : this.state.blurAmount += 1
        this.setState({blurAmount: blurAmount, scrollPos: offset})
      }
    } else if (offset > scrollPos) {
      if (offset >= 0){
        let blurAmount = this.state.blurAmount >= 8 ? 8 : this.state.blurAmount += 1
        this.setState({blurAmount: blurAmount, scrollPos: offset, showThumb: true})
      } else if (offset <= 0){
        let blurAmount = this.state.blurAmount <= 0 ? 0 : this.state.blurAmount -= 1
        this.setState({blurAmount: blurAmount, scrollPos: offset})
      }
    } else if (offset === scrollPos){
      let blurInterval = setInterval(this.reBlur, 100)
      setTimeout(() => clearInterval(blurInterval), 1000)
    }
  }

  reBlur(){
    let blurAmount = this.state.blurAmount += 1;
    if (blurAmount < 8){
      this.setState({blurAmount: blurAmount, scrollPos: 0, showThumb: true})
    }
  }

  renderThumb(artist){
    let followText = this.state.followed ? "UNFOLLOW" : "FOLLOW"
    return (
      <View style={styles.titleContainer}>
        <View style={styles.thumb}>
          <Image
            style={styles.thumb}
            source={{uri: artist.banner_url }}
            />
        </View>
        <Text style={styles.title}>{artist.name}</Text>
        <TouchableOpacity
          style={styles.followBtn}
          onPress={() => this.toggleFollow()}>
          <Text style={styles.followText}>{followText}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderAlbums(artist){

    let albums = this.state.albums.map((album, idx) => {
      return (
        <TouchableOpacity
          key={idx}
          style={styles.albumItem}
          onPress={() => this.props.changeTab('album', album, 'push')}>
          <Image
            style={styles.albumImage}
            source={{uri: album.image_url}}
            />
          <Text
            style={styles.albumName}
            numberOfLines={1}
            ellipsizeMode="tail">
            {album.name}
          </Text>
        </TouchableOpacity>
      )
    })

    return (
      <View style={styles.albumsContainer}>
        {albums}
      </View>
    )
  }

  checkFollow(){
    return fetch(`http://www.beathub.us/api/follows/artists/${this.props.artist.id}/${this.props.currentUser.id}`, {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON)
        this.setState({followed: responseJSON.follows})
      }).catch(function(error){
        console.log(`Got an error: ${error}`)
      })
  }

  follow(){
    let follow = {follower_id: this.props.currentUser.id, followable_id: this.props.artist.id, followable_type: 'Artist'}
    fetch(`http://www.beathub.us/api/follows`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(follow)
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({followed: true})
      }).catch(function(error){
        console.log(`Got an error: ${error}`)
      })
  }

  unfollow(){
    let follow = {follower_id: this.props.currentUser.id, followable_id: this.props.artist.id, followable_type: 'Artist'}
    fetch(`http://www.beathub.us/api/follows/${this.props.artist.id}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(follow)
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({followed: false})
      }).catch(function(error){
        console.log(`Got an error: ${error}`)
      })
  }

  toggleFollow(){
    if (this.state.followed){
      this.unfollow()
    } else {
      this.follow()
    }
  }

  render() {
    let artist = this.props.artist;
    let navStack = this.props.navStack;
    let previous = navStack[navStack.length - 1]
    let thumb = this.state.showThumb ? this.renderThumb(artist) : null
    let albums = this.state.albums ? this.renderAlbums(artist) : this._renderLoading()

    return (
      <ScrollView
        style={styles.viewContainer}
        onScroll={this.handleScroll}
        scrollEventThrottle={1}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => this.goBack()}>
          <Icon
            name="chevron-left"
            size={20}
            style={styles.itemIcon}
          />
        </TouchableOpacity>

        <View style={styles.banner}>
          <Image
            style={styles.banner}
            source={{uri: artist.banner_url }}
            onLoadEnd={this.imageLoaded.bind(this)}
            />
          <BlurView
            blurType='light'
            blurAmount={this.state.blurAmount}
            style={styles.blur}
            viewRef={this.state.viewRef}
            />
        </View>

        {thumb}

        <Text style={styles.sectionTitle}>Albums</Text>
        {albums}

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  title: {
    top: 125,
    fontSize: 20,
    fontFamily: "Helvetica",
    color: "white",
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "bold",
    position: "absolute",
    backgroundColor: "transparent",
    zIndex: 20,
  },
  banner: {
    alignSelf: 'stretch',
    height: 185
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
  blur: {
    alignSelf: 'stretch',
    height: 185,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  thumb: {
    position: 'absolute',
    top: 25,
    alignSelf: 'center',
    borderRadius: 50,
    height: 100,
    width: 100
  },
  sectionTitle: {
    fontFamily: "Helvetica",
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20
  },
  titleContainer: {
    position: "absolute",
    top: 25,
    left: 0,
    right: 0
  },
  albumImage: {
    width: 150,
    height: 150
  },
  albumsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    flexWrap: "wrap"
  },
  albumName: {
    color: "white",
    textAlign: "center",
    fontFamily: "Helvetica"
  },
  albumItem: {
    marginLeft: 10,
    marginRight: 10,
    maxWidth: 150
  },
  followBtn: {
    width: 80,
    height: 20,
    borderRadius: 20,
    position: "absolute",
    top: 150,
    alignSelf: "center",
    backgroundColor: 'transparent',
    borderColor: "silver",
    borderWidth: 2
  },
  followText: {
    color: 'white',
    textAlign: "center",
    fontSize: 12
  }
})


export default ArtistScreen;
