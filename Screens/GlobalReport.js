import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import Svg, {Ellipse} from 'react-native-svg';
import {Card} from 'react-native-paper';

import {StackedBarChart} from 'react-native-chart-kit';
import {NavigationContainer} from '@react-navigation/native';
import Header1 from '../header/Header';

export default class Globalreport extends Component {
  state = {
    choosenIndex: 0,
  };

  render() {
    const FlagImage = require('../assets/Franceflag.png');

    return (
      <NavigationContainer independent={true}>
        <Header1 navigation={this.props.navigation} />
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <StackedBarChart
                data={{
                  labels: ['2016', '2017', '2018', '2019', '2020', '2021'],

                  data: [
                    [20, 1, 10, 10, 10, 10, 10],
                    [15, 20, 4, 5, 3, 10, 12],
                    [15, 20, 4, 8, 5, 9, 14],
                    [15, 20, 4, 10, 7, 12, 16],
                    [15, 20, 4, 15, 9, 15, 18],
                    [15, 20, 4, 20, 18, 11, 20],
                  ],
                  barColors: [
                    '#03046A',
                    '#FA8072',
                    '#FADBD8',
                    '#fff',
                    '#F1C40F',
                    '#7D3C98',
                    '#3498DB',
                  ],
                }}
                width={450}
                height={300}
                chartConfig={{
                  backgroundColor: '#1cc910',
                  backgroundGradientFrom: '#075E54',
                  backgroundGradientTo: '#efefef',
                  decimalPlaces: 1,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                style={{
                  margin: 8,
                  borderRadius: 1,
                }}
              />
            </ScrollView>
            <Card style={styles.cardglobal}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.awaittext}>Awaited Contribution</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={FlagImage}
                      style={{
                        height: 30,
                        width: 50,
                        marginLeft: 20,
                        marginTop: 20,
                      }}
                    />
                    <Text style={styles.amount}> 120.67 </Text>
                    <Text style={styles.amounte}> € </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.mycontr}>My Contribution</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.globaltxt}> Global </Text>

                    <Text style={styles.amountglo}>4507</Text>
                    <Text style={styles.amountglo}>€</Text>
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
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.globaltxt}> 2019 </Text>

                    <Text style={styles.amountglo1}>4507</Text>
                    <Text style={styles.amountglo}>€</Text>
                    <Svg viewBox="0 0 41.97 40.35" style={styles.ellipse1}>
                      <Ellipse
                        stroke="rgba(230, 230, 230,1)"
                        strokeWidth={0}
                        fill="#000"
                        cx={21}
                        cy={20}
                        rx={21}
                        ry={20}></Ellipse>
                    </Svg>
                  </View>
                </View>
              </View>
            </Card>
            <View>
              <Text style={styles.topcontr}>TOP CONTRIBUTORS</Text>
            </View>
          </ScrollView>
        </View>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topcontr: {
    fontSize: 25,
    color: '#075E54',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },

  projectorcontributors: {
    flexDirection: 'row',
    flex: 1,
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  label: {
    marginTop: 2,
    fontSize: 13,
    color: '#075E54',
    fontWeight: 'bold',
  },
  awaittext: {
    fontSize: 17,
    color: '#075E54',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 5,
  },
  mycontr: {
    fontSize: 17,
    color: '#075E54',
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 5,
  },
  amount: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 20,
  },
  amounte: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 20,
  },
  globaltxt: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 12,
    marginTop: 20,
  },
  amountglo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 22,
    marginLeft: 5,
  },
  amountglo1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 22,
    marginLeft: 12,
  },
  yeartxt: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: 5,
  },
  ellipse: {
    width: 26,
    height: 26,
    marginTop: 20,
    marginLeft: 5,
  },
  ellipse1: {
    width: 26,
    height: 26,
    marginTop: 20,
    marginLeft: 10,
  },
  cardglobal: {
    elevation: 10,
    margin: 10,
    height: 150,
    borderRadius: 10,
  },
  namesureeedit1: {
    height: 59,
    width: 200,
    backgroundColor: '#075E54',
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
});
