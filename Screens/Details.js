import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Card} from 'react-native-paper';

import {NavigationContainer} from '@react-navigation/native';
import Header1 from '../header/Header';
import {Component} from 'react';

export default class Details extends Component {
  render() {
    return (
      // <NavigationContainer independent={true}>
      //   <Header1 />
      <SafeAreaView style={styles.container}>
        <Header1 navigation={this.props.navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Card style={styles.card}>
            <Text style={styles.allamount}>$298.00</Text>
          </Card>

          <FlatList
            horizontal={true}
            data={[
              {Project: 'Project1', id: 'AAAA-0000', amount: '$230.00'},
              {Project: 'Project2', id: 'AAAA-0001', amount: '$230.00'},
              {Project: 'Project3', id: 'AAAA-0002', amount: '$230.00'},
              {Project: 'Project4', id: 'AAAA-0003', amount: '$230.00'},
              {Project: 'Project5', id: 'AAAA-0004', amount: '$230.00'},
              {Project: 'Project6', id: 'AAAA-0005', amount: '$230.00'},
            ]}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity>
                <Text style={styles.text}>
                  {item.Project} {'\n'} {'\n'}
                  {item.amount}{' '}
                </Text>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </SafeAreaView>
      // </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    padding: 10,
    marginLeft: 100,
    marginRight: 100,
    marginTop: 10,
    backgroundColor: '#075E54',
    borderRadius: 10,
  },
  allamount: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
  },
  text: {
    backgroundColor: '#075E54',
    marginTop: 10,
    padding: 20,
    color: '#fff',
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
