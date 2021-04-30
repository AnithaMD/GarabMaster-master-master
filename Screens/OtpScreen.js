import React, {Component, useState} from 'react';

import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'TestDataB.db'});

export default class OTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    };
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='user_api'",
        [],
        (txn, res) => {
          console.log('ORitem:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS user_api', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS user_api(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_Alias VARCHAR(20),user_AppID INT(10),user_AppType INT(20),user_DataAccessID INT(10),user_ParentID INT(20),user_UserID INT(10),user_myGarab VARCHAR(255),user_MyGarabWallet VARCHAR(255),Rebalance_Earth VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }

  onPresssubmit = () => {
    console.log(this.props.route.params.residence);

    const {code} = this.state;
    if (code == '' || code.length < 6) {
      alert('Please enter correct security code');
    } else {
      fetch(
        'http://40.91.193.97:8080/ValidCLIRegistration?AppType=CLI&Key=' +
          code +
          '&Gender=' +
          this.props.route.params.genderselection +
          '&ClientName=' +
          this.props.route.params.name +
          '&ClientSurname=' +
          this.props.route.params.surname +
          '&BirthDate=' +
          this.props.route.params.date +
          '&TelPrefix=' +
          this.props.route.params.phoneNumber +
          '&TelNum=' +
          this.props.route.params.mob +
          '&Mail=' +
          this.props.route.params.email +
          '&ResidenceCountry=' +
          this.props.route.params.residence +
          '&ContribCountry=' +
          this.props.route.params.contribution +
          '&PassWord=' +
          this.props.route.params.pass +
          '&Adress=' +
          this.props.route.params.UserResidenceCountry +
          '&TopAutoAccount=Y&Err=0&Msg=siis',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      )
        .then(response => response.json())
        .then(data => {
          if (data.Err === 0) {
            alert('ok');

            db.transaction(tx => {
              tx.executeSql(
                'INSERT INTO user_api (user_Alias,user_AppID,user_AppType,user_DataAccessID,user_ParentID,user_UserID,user_myGarab,user_MyGarabWallet,Rebalance_Earth) VALUES (?,?,?,?,?,?,?,?,?)',
                [
                  data['#result-set-1'][0]['@@Alias'],
                  data['#result-set-1'][0]['@@AppID'],
                  data['#result-set-1'][0]['@@AppType'],
                  data['#result-set-1'][0]['@@DataAccessID'],
                  data['#result-set-1'][0]['@@ParentID'],
                  data['#result-set-1'][0]['@@UserID'],
                  data['#result-set-1'][0]['My Garab'],
                  data['#result-set-1'][0]['My Garab Wallet'],
                  data['#result-set-1'][0]['Rebalance Earth'],
                ],
                (tx, results) => {
                  console.log('OrResults', results.rowsAffected);
                  if (results.rowsAffected > 0) {
                    alert(
                      'Success',
                      'You are Registered Successfully',
                      [
                        {
                          text: 'Ok',
                          // onPress: () => navigation.navigate('HomeScreen'),
                        },
                      ],
                      {cancelable: false},
                    );
                  } else alert('Registration Failed');
                },
              );
            });

            console.log(data);
            // this.props.navigation.push('Login');
          } else {
            console.log(code);
            alert(data.Msg);
          }
        });
    }
  };

  render() {
    return (
      <View style={styles.root}>
        <StatusBar barStyle="dark-content" backgroundColor="#075E54" />
        <Text style={styles.title}>
          Enter the verification code {'\n'}we just sent you on your mobile
          number{' '}
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.backgroundres}>
            <View style={styles.progressBarColumnres}>
              <View style={styles.formres}>
                <View style={styles.nameres1}>
                  <TextInput
                    multiline={false}
                    textAlign="center"
                    onChangeText={code => this.setState({code})}
                    maxLength={6}
                    autoFocus={true}
                    selectionColor={'black'}
                    secureTextEntry={false}
                    style={styles.nameInputres1}></TextInput>
                </View>

                <View>
                  <TouchableOpacity
                    onPress={this.onPresssubmit}
                    style={styles.buttonres}>
                    <Text style={styles.text2res}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
    minHeight: 300,
    alignItems: 'center',
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: '#075E54',
  },

  backgroundres: {
    flex: 1,
  },
  formres: {
    flex: 1,
    marginTop: 30,
  },
  nameres1: {
    height: 59,
    borderBottomWidth: 2,
    borderBottomColor: '#075E54',
    flexDirection: 'row',
  },

  nameInputres1: {
    height: 50,
    color: '#000',
    fontSize: 16,
    flex: 1,
    letterSpacing: 15,
    marginRight: 13,
    marginLeft: 13,
    marginTop: 14,
  },

  resendtext: {
    marginTop: 12,
    fontSize: 17,
    color: '#075E54',
  },

  buttonres: {
    height: 55,
    backgroundColor: '#075E54',
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 55,
    marginTop: 20,
    width: 200,
  },
  text2res: {
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    fontSize: 18,
  },
});
