import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class CheckboxHome extends Component {
  constructor() {
    super();
    this.state = {
      data: ['Projects', 'Contributors'],
      checked: 0,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.data.map((data, key) => {
          return (
            <View key={data}>
              {this.state.checked == key ? (
                <TouchableOpacity style={styles.btn}>
                  <Ionicons name="checkbox" size={24} color="#075E54" />
                  <Text
                    style={{
                      color: '#075E54',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    {data}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => this.setState({checked: key})}
                  style={styles.btn}>
                  <MaterialCommunityIcons
                    name="checkbox-blank-outline"
                    size={24}
                    color="#000"
                  />
                  <Text
                    key={data}
                    style={{
                      color: '#85898c',
                      fontSize: 20,
                      marginLeft: 3,
                      fontWeight: 'bold',
                    }}>
                    {data}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
});
