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


class TabBar extends React.Component {
  constructor(){
    super()
      this.state = {
        selectedTab: 'tabOne',
        searchTab: 'search',
        searchProps: null,
        navStack: [ {searchTab: 'search', searchProps: null} ]
      }
      this.renderSearchScreen = this.renderSearchScreen.bind(this)
      this.changeSearchTab = this.changeSearchTab.bind(this)
  }

  setTab(tabId){
    this.setState({selectedTab: tabId})
  }

  changeSearchTab(searchTab, searchProps, action){
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
      navStack.push({searchTab: searchTab, searchProps: searchProps})
      this.setState({
        searchTab: searchTab,
        searchProps: searchProps,
        navStack: navStack
      })
    } else if ( action === 'pop'){
      navStack.pop()
      let previous = navStack[navStack.length - 1]
      this.setState({
        searchTab: previous.searchTab,
        searchProps: previous.searchProps,
        navStack: navStack
      })
    }
  }


  renderSearchScreen(){
    if (this.state.searchTab === 'search'){
      return (
        <SearchScreen
          navigation={this.props.navigation} changeSearchTab={this.changeSearchTab}/>
      )
    } else if (this.state.searchTab === 'artist'){
      return (
        <ArtistScreen
          artist={this.state.searchProps}
          navStack={this.state.navStack}
          changeSearchTab={this.changeSearchTab}
          />
      )
    } else if (this.state.searchTab === 'album'){
      return (
        <AlbumScreen
          album={this.state.searchProps}
          navStack={this.state.navStack}
          changeSearchTab={this.changeSearchTab}
          _setAudioBar={this.props._setAudioBar}
          />
      )
    }
  }

  render() {

    let searchScreen = this.renderSearchScreen()

    return (

      <TabBarIOS>

        <FoundationIcon.TabBarItemIOS
          title="Home"
          iconName="home"
          iconSize={35}
          selectedIconName="home"
          selected={this.state.selectedTab === "tabOne"}
          onPress={() => this.setTab("tabOne")}>
            <View>
              <HomeScreen
                _setAudioBar={this.props._setAudioBar}/>
            </View>
        </FoundationIcon.TabBarItemIOS>

        <MaterialIcon.TabBarItemIOS
          title="Browse"
          iconName="queue-music"
          iconSize={35}
          selectedIconName="queue-music"
          selected={this.state.selectedTab === "tabTwo"}
          onPress={() => this.setTab("tabTwo")}>
            <View>
              <Text>Browse Screen</Text>
            </View>
        </MaterialIcon.TabBarItemIOS>

        <TabBarIOS.Item
          systemIcon="search"
          selected={this.state.selectedTab === "tabThree"}
          onPress={() => this.setTab("tabThree")}>
          {searchScreen}
        </TabBarIOS.Item>

        <MaterialIcon.TabBarItemIOS
          title="Radio"
          iconName="radio"
          iconSize={35}
          selectedIconName="radio"
          selected={this.state.selectedTab === "tabFour"}
          onPress={() => this.setTab("tabFour")}>
            <View>
              <Text>Radio Screen</Text>
            </View>
        </MaterialIcon.TabBarItemIOS>

        <FoundationIcon.TabBarItemIOS
          title="Library"
          iconName="book"
          iconSize={35}
          selectedIconName="book"
          selected={this.state.selectedTab === "tabFive"}
          onPress={() => this.setTab("tabFive")}>
          <View>
            <Text>Library Screen</Text>
          </View>
        </FoundationIcon.TabBarItemIOS>


      </TabBarIOS>
    );
  }
}

export default TabBar;
