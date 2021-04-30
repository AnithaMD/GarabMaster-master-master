import React, {Component} from 'react';
import {StyleSheet, View, Text, SafeAreaView, StatusBar} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, {Ellipse} from 'react-native-svg';

export default class header extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#075E54" />
        <View style={styles.rect}>
          <View style={styles.ellipseRow}>
            <Svg viewBox="0 0 41.97 40.35" style={styles.ellipse}>
              <Ellipse
                stroke="rgba(230, 230, 230,1)"
                strokeWidth={0}
                fill="rgba(208,2,27,1)"
                cx={21}
                cy={20}
                rx={21}
                ry={20}></Ellipse>
            </Svg>
            <View style={{alignSelf: 'center'}}>
              <Text style={styles.Garabtext}>GARAB</Text>
            </View>
          </View>
          <Icon
            name="bell"
            style={styles.icon}
            onPress={() =>
              this.props.navigation.navigate('Notifications')
            }></Icon>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  rect: {
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    flexDirection: 'row',

    alignSelf: 'center',
  },
  ellipse: {
    width: 26,
    height: 26,
  },

  ellipseRow: {
    height: 24,
    flexDirection: 'row',
    flex: 1,

    marginLeft: 11,
    alignSelf: 'center',
  },
  Garabtext: {
    color: '#1C2833',
    marginLeft: 120,

    fontSize: 25,
    marginTop: -3,
    fontWeight: 'bold',
  },
  icon: {
    color: '#1C2833',
    fontSize: 30,
    alignSelf: 'center',
    marginRight: 10,
  },
});
