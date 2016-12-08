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

// 导航栏的Mapper
var NavigationBarRouteMapper = {
  // 左键
  LeftButton(route, navigator, index, navState) {
    if (index > 0) {
      return (
          <View style={styles.navContainer}>
            <TouchableOpacity
                underlayColor='transparent'
                onPress={() => {if (index > 0) {navigator.pop()}}}>
              <Text style={styles.leftNavButtonText}>
                后退
              </Text>
            </TouchableOpacity>
          </View>
      );
    } else {
      return null;
    }
  },
  // 右键
  RightButton(route, navigator, index, navState) {
    if (route.onPress)
      return (
          <View style={styles.navContainer}>
            <TouchableOpacity
                onPress={() => route.onPress()}>
              <Text style={styles.rightNavButtonText}>
                {route.rightText || '右键'}
              </Text>
            </TouchableOpacity>
          </View>
      );
  },
  // 标题
  Title(route, navigator, index, navState) {
    return (
        <View style={styles.navContainer}>
          <Text style={styles.title}>
            应用标题
          </Text>
        </View>
    );
  }
};

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
        // <View style={styles.container}>
        //   <MainScreen />
        // </View>
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
  // 导航栏
  navContainer: {
    backgroundColor: '#81c04d',
    paddingTop: 12,
    paddingBottom: 10,
  },
  // 导航栏文字
  headText: {
    color: '#ffffff',
    fontSize: 22
  },
  // 按钮
  button: {
    height: 60,
    marginTop: 10,
    justifyContent: 'center', // 内容居中显示
    backgroundColor: '#ff1049',
    alignItems: 'center'
  },
  // 按钮文字
  buttonText: {
    fontSize: 18,
    color: '#ffffff'
  },
  // 左面导航按钮
  leftNavButtonText: {
    color: '#ffffff',
    fontSize: 18,
    marginLeft: 13
  },
  // 右面导航按钮
  rightNavButtonText: {
    color: '#ffffff',
    fontSize: 18,
    marginRight: 13
  },
  // 标题
  title: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    flex: 1                //Step 3
  }
});

AppRegistry.registerComponent('RCTZhiHuDaily', () => RCTZhiHuDaily);
