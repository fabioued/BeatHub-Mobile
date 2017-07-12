import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  TabBarIOS,
  LayoutAnimation
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import SearchScreen from '../screens/Search'
import HomeScreen from '../screens/Home'
import ArtistScreen from '../screens/ArtistScreen'
import AlbumScreen from '../screens/AlbumScreen'
import BrowseScreen from '../screens/Browse'
import CollectionScreen from '../screens/Collection'
import RadioScreen from '../screens/Radio'
import LibraryScreen from '../screens/Library'
import PlaylistsScreen from '../screens/Playlists'
import PlaylistScreen from '../screens/Playlist'
import MyArtistsScreen from '../screens/MyArtists'


class TabBar extends React.Component {
  constructor(){
    super()
      this.state = {
        selectedTab: 'tabOne',
        tab: 'home',
        tabProps: null,
        navStack: [ {tab: 'home', tabProps: null} ]
      }
      this.renderScreen = this.renderScreen.bind(this)
      this.changeTab = this.changeTab.bind(this)
      this.setRadioTab = this.setRadioTab.bind(this);
  }

  setTab(tabId, tab){
    let navStack = this.state.navStack;
    navStack.push({tab: tab, tabProps: null})
    this.setState({selectedTab: tabId, navStack: navStack, tab: tab})
  }

  changeTab(tab, tabProps, action){
    var CustomAnimation = {
      duration: 400,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7
      }
    }

    LayoutAnimation.configureNext(CustomAnimation)
    let navStack = this.state.navStack.slice()
    if (action === 'push'){
      navStack.push({tab: tab, tabProps: tabProps})
      this.setState({
        tab: tab,
        tabProps: tabProps,
        navStack: navStack
      })
    } else if ( action === 'pop'){
      navStack.pop()
      let previous = navStack[navStack.length - 1]
      this.setState({
        tab: previous.tab,
        tabProps: previous.tabProps,
        navStack: navStack
      })
    }
  }


  renderScreen(){
    if (this.state.tab === 'search'){
      return (
        <SearchScreen
          navigation={this.props.navigation}
          changeTab={this.changeTab}
          _setAudioBar={this.props._setAudioBar}
          />
      )
    } else if (this.state.tab === 'home'){
      return (
        <HomeScreen
          navigation={this.props.navigation}
          changeTab={this.changeTab}/>
      )
    } else if (this.state.tab === 'browse'){
      return (
        <BrowseScreen
          navigation={this.props.navigation}
          changeTab={this.changeTab}
          />
      )
    } else if (this.state.tab === 'radio'){
      return (
        <RadioScreen
          navigation={this.props.navigation}
          changeTab={this.changeTab}
          _playRadio={this.props._playRadio}
          fetchingSongs={this.props.fetchingSongs}/>
      )
    } else if (this.state.tab === 'library'){
      return (
        <LibraryScreen
          navigation={this.props.navigation}
          changeTab={this.changeTab}/>
      )
    } else if (this.state.tab === 'artist'){
      return (
        <ArtistScreen
          artist={this.state.tabProps}
          navStack={this.state.navStack}
          changeTab={this.changeTab}
          currentUser={this.props.currentUser}
          />
      )
    } else if (this.state.tab === 'album'){
      return (
        <AlbumScreen
          album={this.state.tabProps}
          navStack={this.state.navStack}
          changeTab={this.changeTab}
          _setAudioBar={this.props._setAudioBar}
          />
      )
    } else if (this.state.tab === 'collection'){
      return (
        <CollectionScreen
          collection={this.state.tabProps}
          navStack={this.state.navStack}
          changeTab={this.changeTab}
          />
      )
    } else if (this.state.tab === 'playlists'){
      return(
        <PlaylistsScreen
          navStack={this.state.navStack}
          changeTab={this.changeTab}
          currentUser={this.props.currentUser}
          />
      )
    } else if (this.state.tab === 'playlist'){
      return(
        <PlaylistScreen
          navStack={this.state.navStack}
          changeTab={this.changeTab}
          currentUser={this.props.currentUser}
          playlist={this.state.tabProps}
          _setAudioBar={this.props._setAudioBar}
          />
      )
    } else if (this.state.tab === 'myArtists'){
      return (
        <MyArtistsScreen
          navStack={this.state.navStack}
          changeTab={this.changeTab}
          currentUser={this.props.currentUser}
          _setAudioBar={this.props._setAudioBar}
          />
      )
    }
  }

  setRadioTab(){
    this.setTab("tabFour", "radio");
    this.props._playRadio()
  }

  render() {

    let screen = this.renderScreen()

    return (

      <TabBarIOS
        barTintColor="#383838"
        tintColor="#07d159">

        <FoundationIcon.TabBarItemIOS
          title="Home"
          iconName="home"
          iconSize={35}
          selectedIconName="home"
          selected={this.state.selectedTab === "tabOne"}
          onPress={() => this.setTab("tabOne", "home")}>
            {screen}
        </FoundationIcon.TabBarItemIOS>

        <MaterialIcon.TabBarItemIOS
          title="Browse"
          iconName="queue-music"
          iconSize={35}
          selectedIconName="queue-music"
          selected={this.state.selectedTab === "tabTwo"}
          onPress={() => this.setTab("tabTwo", "browse")}>
            {screen}
        </MaterialIcon.TabBarItemIOS>

        <TabBarIOS.Item
          systemIcon="search"
          selected={this.state.selectedTab === "tabThree"}
          onPress={() => this.setTab("tabThree", "search")}>
          {screen}
        </TabBarIOS.Item>

        <MaterialIcon.TabBarItemIOS
          title="Radio"
          iconName="radio"
          iconSize={35}
          selectedIconName="radio"
          selected={this.state.selectedTab === "tabFour"}
          onPress={() => this.setRadioTab()}>
          {screen}
        </MaterialIcon.TabBarItemIOS>

        <FoundationIcon.TabBarItemIOS
          title="Library"
          iconName="book"
          iconSize={35}
          selectedIconName="book"
          selected={this.state.selectedTab === "tabFive"}
          onPress={() => this.setTab("tabFive", "library")}>
          {screen}
        </FoundationIcon.TabBarItemIOS>


      </TabBarIOS>
    );
  }
}

export default TabBar;
