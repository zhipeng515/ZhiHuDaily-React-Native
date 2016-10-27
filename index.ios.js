/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    NavigatorIOS,
} from 'react-native';

import SplashScreen from './SplashScreen';
import MainScreen from './MainScreen';
import StoryScreen from './StoryScreen';

var _navigator;

export default class RCTZhiHuDaily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      splashed: false
    };
  }

  componentDidMount() {
    this.timer = setTimeout(
      () => {
        this.setState({splashed: true});
      },
      2000,
    );
  };

  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    this.timer && clearTimeout(this.timer);
  }

  RouteMapper(route, navigationOperations, onComponentRef) {
    _navigator = navigationOperations;
    // return (
    //   <View style={styles.container}>
    //     <MainScreen navigator={navigationOperations}/>
    //   </View>
    // );
    if (route.name === 'home') {
      return (
        <View style={styles.container}>
          <MainScreen navigator={navigationOperations}/>
        </View>
      );
    } else if (route.name === 'story') {
      return (
        <View style={styles.container}>
          <StoryScreen
            style={{flex: 1}}
            navigator={navigationOperations}
            story={route.story} />
        </View>
      );
    }
  };

  render() {
    if (this.state.splashed) {
      var initialRoute = {name: 'home'};
      return (
        // <NavigatorIOS
        //   style={styles.container}
        //   initialRoute={{
        //     title: '首页',
        //     component: MainScreen,
        //   }}
        // />
        <Navigator
          style={styles.container}
          initialRoute={initialRoute}
          configureScene={() => Navigator.SceneConfigs.FadeAndroid}
          renderScene={this.RouteMapper}
        />
      );
      // return (
      //   <View style={styles.container}>
      //     <MainScreen />
      //   </View>
      // );
    } else {
      return (
        <SplashScreen />
      );
    }
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('RCTZhiHuDaily', () => RCTZhiHuDaily);
