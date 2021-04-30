import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  LogBox,
} from 'react-native';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import RNPickerSelect from 'react-native-picker-select';
import ConCode from './ConCode';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInputMask} from 'react-native-masked-text';
import ConSelect from '../Screens/CountrySelect/ResidentalCountry';
import ConSelect1 from '../Screens/CountrySelect/ContributionCountry';

import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'TestDataB.db'});

export default class Signup extends Component {
  //////////////////////////////show and Hide Password///////////////////////
  constructor(props) {
    super(props);

    this.state = {
      UserName: '',
      UserSurname: '',
      UserEmail: '',
      UserMobile: '',
      password: '',
      dt: '',
      UserResidenceCountry: '',
      UserResidenceCountry1: '',
      UserContributionCountry: '',
      genderselection: '',
      phoneNumber: '33',
    };

    ///////////////////////create sqlite database table///////////////////////

    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        (txn, res) => {
          console.log('Critem:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20),user_surname VARCHAR(255),user_email VARCHAR(255),user_dob INT(10),user_address VARCHAR(255),user_gender VARCHAR(2),user_phonecode INT(2), user_contact INT(10),user_Rescountry VARCHAR(255),user_concountry VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }

  //////////////////////creating sqlite database finish///////////

  componentDidMount() {
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested',
      'componentWillReceiveProps has been renamed',
    ]);
  }

  changeNumber(item) {
    this.setState({phoneNumber: item});
  }
  changeresident(item) {
    this.setState({UserResidenceCountry1: item});
  }
  changeContribution(item) {
    this.setState({UserContributionCountry: item});
  }

  /////////////////Api integration is pending ///////////////////
  validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  validateName = string => {
    return !/[^a-zA-Z]/.test(string);
  };

  validateForm = () => {
    /////validation part of all the fields/////////////

    const {UserName, UserSurname, UserEmail, UserMobile, password} = this.state;

    if (
      UserName == '' ||
      UserName.length < 4 ||
      this.validateName(UserName) === false
    ) {
      this.refs.NameField.focus();
      return false;
    } else if (
      UserSurname == '' ||
      UserSurname.length < 4 ||
      this.validateName(UserSurname) === false
    ) {
      this.refs.SurNameField.focus();
      return false;
    } else if (UserEmail == '') {
      this.refs.EmailField.focus();
      return false;
    } else if (this.validateEmail(UserEmail) === false) {
      this.refs.EmailField.focus();
      return false;
    } else if (UserMobile == '') {
      this.refs.MobilenumberField.focus();
      return false;
    } else if (password == '' || password.length < 8) {
      this.refs.PasswordField.focus();
      return false;
    } else if (!this.state.dt) {
      alert('Please Fill Date');
      return false;
    } else if (!this.state.UserResidenceCountry1) {
      alert('Please fill Residence Country ');
      return false;
    } else if (!this.state.genderselection) {
      alert('Please fill Gender');
      return false;
    } else if (!this.state.UserContributionCountry) {
      alert('Please fill Contribution Country');
      return false;
    }

    return true;
  };

  onclickReg = () => {
    const {UserMobile} = this.state;

    const {phoneNumber} = this.state;

    if (this.validateForm()) {
      fetch(
        'http://40.91.193.97:8080/InitRegistration?AppType=CLI&TelPrefix=' +
          phoneNumber +
          '&TelNum=' +
          UserMobile +
          '&UserID=-1&ValidatorID=-1&Err=0&Msg=ssd',
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
            console.log(data);
            alert(data['#result-set-1'][0]['Key']);
            this.InsertDBAction();

            this.props.navigation.push('OTP Screen', {
              name: this.state.UserName,
              surname: this.state.UserSurname,
              email: this.state.UserEmail,
              pass: this.state.password,
              date: this.state.dt,
              mob: this.state.UserMobile,
              genderselection: this.state.genderselection,
              UserResidenceCountry: this.state.UserResidenceCountry,
              phoneNumber: this.state.phoneNumber,
              residence: this.state.UserResidenceCountry1,
              contribution: this.state.UserContributionCountry,
            });
          } else {
            alert('Please check input fields');
          }
        })
        .catch(error => {
          console.log(error);
          alert('Please Check Your Input Fields');
        });
    }
  };

  //////////////////////////////////ssssssssss/////////////////////////////////////////////
  InsertDBAction() {
    const {
      UserName,
      UserEmail,
      UserSurname,
      UserMobile,
      dt,
      genderselection,
      phoneNumber,
      UserResidenceCountry,
      UserResidenceCountry1,
      UserContributionCountry,
    } = this.state;
    console.log('insertDB Called');

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO table_user (user_name,user_surname, user_email,user_dob,user_address,user_gender,user_phonecode,user_contact,user_Rescountry,user_concountry) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [
          UserName,
          UserSurname,
          UserEmail,
          dt,
          UserResidenceCountry,
          genderselection,
          phoneNumber,
          UserMobile,
          UserResidenceCountry1,
          UserContributionCountry,
        ],
        (tx, results) => {
          console.log('CRResults', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
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
  }

  render() {
    return (
      <View style={styles.rootcreate}>
        <StatusBar barStyle="dark-content" backgroundColor="#075E54" />

        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
          <View style={styles.backgroundcreate}>
            <View style={styles.progressBarColumncreate}>
              <Text style={styles.text3create}>Register</Text>
              <View style={styles.formcreate}>
                <View style={styles.namecreate}>
                  <MaterialCommunityIcons
                    name="account-circle"
                    style={styles.icon5create}></MaterialCommunityIcons>
                  <TextInput
                    ref="NameField"
                    onChangeText={UserName => this.setState({UserName})}
                    multiline={false}
                    selectionColor={'white'}
                    placeholder="Name"
                    placeholderTextColor="#D3D3D3"
                    secureTextEntry={false}
                    style={styles.nameInputcreate}></TextInput>
                </View>
                <View style={styles.namesureecreate}>
                  <MaterialCommunityIcons
                    name="account-circle"
                    style={styles.icon5create}></MaterialCommunityIcons>
                  <TextInput
                    ref="SurNameField"
                    onChangeText={UserSurname => this.setState({UserSurname})}
                    multiline={false}
                    selectionColor={'white'}
                    placeholder="Surename"
                    placeholderTextColor="#D3D3D3"
                    secureTextEntry={false}
                    style={styles.nameInputcreate}></TextInput>
                </View>
                <View style={styles.namesureecreate}>
                  <MaterialCommunityIcons
                    name="email"
                    style={styles.icon5create}></MaterialCommunityIcons>
                  <TextInput
                    ref="EmailField"
                    onChangeText={UserEmail => this.setState({UserEmail})}
                    multiline={false}
                    selectionColor={'white'}
                    placeholder="Email Address"
                    placeholderTextColor="#D3D3D3"
                    secureTextEntry={false}
                    style={styles.nameInputcreate}></TextInput>
                </View>
                <View style={styles.namesureecreate}>
                  <MaterialCommunityIcons
                    name="calendar-month"
                    style={styles.icon5create}></MaterialCommunityIcons>
                  <TextInputMask
                    style={{
                      color: '#fff',
                      marginLeft: 10,
                    }}
                    type={'datetime'}
                    options={{
                      format: 'DD/MM/YYYY',
                    }}
                    placeholder="Date of Birth"
                    placeholderTextColor="#D3D3D3"
                    value={this.state.dt}
                    onChangeText={text => {
                      this.setState({
                        dt: text,
                      });
                    }}
                  />
                </View>

                <View
                  style={{
                    marginTop: 10,
                    flex: 1,
                    backgroundColor: '#fff',
                    borderRadius: 5,
                  }}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={33}
                    color="#fff"
                    style={{
                      zIndex: 999,
                      top: 10,
                      position: 'absolute',
                      marginLeft: 13,
                    }}></MaterialCommunityIcons>
                  <GooglePlacesAutocomplete
                    selectionColor="#FFF"
                    placeholder="Residence Address"
                    placeholderTextColor="#D3D3D3"
                    enablePoweredByContainer={false}
                    minLength={1} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    listViewDisplayed="false" // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => {
                      this.setState(
                        {UserResidenceCountry: data.description},
                        () => {
                          console.log(data.description);
                        },
                      );
                    }}
                    getDefaultValue={() => {
                      return ''; // text input default value
                    }}
                    query={{
                      // available options: https://developers.google.com/places/web-service/autocomplete
                      key: 'AIzaSyBnbUoUlt7JjDP9z2YzenMXAp33KVnK6zM',
                      language: 'en', // language of the results
                    }}
                    styles={{
                      description: {
                        fontWeight: 'bold',
                      },
                      textInput: {
                        // marginTop:50,
                        marginLeft: 0,
                        marginRight: 0,
                        marginTop: 0,
                        paddingTop: 0,
                        paddingLeft: 60,
                        height: 55,
                        backgroundColor: '#075E54',
                        color: '#fff',
                        fontSize: 14,
                      },
                      textInputContainer: {
                        backgroundColor: '#075E54',
                        borderRadius: 5,
                        marginTop: 0,
                        height: 59,
                        paddingTop: 0,
                      },

                      predefinedPlacesDescription: {
                        color: '#1faadb',
                      },
                    }}
                    //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                    currentLocationLabel="Current location"
                    nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GoogleReverseGeocodingQuery={{}}
                    GooglePlacesSearchQuery={{
                      rankby: 'distance',
                    }}
                    debounce={200}
                  />
                </View>
                <View style={styles.namesureecreate}>
                  <MaterialCommunityIcons
                    name="gender-male-female"
                    style={styles.icon5create}></MaterialCommunityIcons>
                  <RNPickerSelect
                    ref="genderfield"
                    itemKey={this.state.genderselection}
                    onValueChange={(value, itemIndex) =>
                      this.setState({genderselection: value}, () => {
                        console.log(value);
                      })
                    }
                    placeholder={{
                      label: 'Select Gender',
                      value: null,
                    }}
                    // placeholderTextColor="#d3d3d3"
                    style={{
                      inputAndroid: {
                        paddingLeft: 25,
                        borderWidth: 2,
                        borderColor: 'transparent',
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderRadius: 10,
                        marginRight: 20,
                        height: 50,
                        fontSize: 14,
                        color: 'white',
                        width: 200,
                        paddingTop: 6,
                        marginTop: 2,
                      },
                      placeholder: {
                        color: '#d3d3d3',
                        marginTop: 2,
                      },
                      inputIOS: {
                        marginLeft: 3,
                        paddingLeft: 12,
                        borderWidth: 2,
                        borderColor: 'transparent',
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderRadius: 10,
                        marginRight: 20,
                        height: 50,
                        color: 'white',
                        width: 200,
                        fontSize: 14,
                        paddingTop: 6,
                        marginTop: 2,
                      },
                    }}
                    items={[
                      {label: 'Male', value: 'M', color: '#000'},
                      {label: 'Female', value: 'F', color: '#000'},
                    ]}
                  />
                </View>

                <View style={styles.namesureecreate}>
                  <ConCode
                    data={{
                      phoneNumber: this.state.phoneNumber,
                      changeNumber: this.changeNumber.bind(this),
                    }}
                  />

                  <MaterialCommunityIcons
                    name="phone"
                    style={styles.icon5create}></MaterialCommunityIcons>
                  <TextInput
                    ref="MobilenumberField"
                    onChangeText={UserMobile => this.setState({UserMobile})}
                    secureTextEntry={false}
                    multiline={false}
                    keyboardType="phone-pad"
                    selectionColor={'white'}
                    placeholder="Mobile Number"
                    placeholderTextColor="#D3D3D3"
                    style={styles.nameInputcreate}></TextInput>
                </View>

                <View style={styles.namesureecreate}>
                  <MaterialCommunityIcons
                    name="lock"
                    style={styles.icon5create}></MaterialCommunityIcons>
                  <TextInput
                    ref="PasswordField"
                    onChangeText={password => this.setState({password})}
                    secureTextEntry={false}
                    multiline={false}
                    selectionColor={'white'}
                    placeholder="Password"
                    placeholderTextColor="#D3D3D3"
                    style={styles.nameInputcreate}></TextInput>
                </View>

                <View style={styles.namesureecreate}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={33}
                    color="#fff"
                    style={{
                      zIndex: 999,
                      top: 10,
                      position: 'absolute',
                      marginLeft: 13,
                    }}></MaterialCommunityIcons>
                  <ConSelect
                    data={{
                      UserResidenceCountry1: this.state.UserResidenceCountry1,
                      changeresident: this.changeresident.bind(this),
                    }}
                  />
                </View>

                <View style={styles.namesureecreate}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={33}
                    color="#fff"
                    style={{
                      zIndex: 999,
                      top: 10,
                      position: 'absolute',
                      marginLeft: 13,
                    }}></MaterialCommunityIcons>
                  <ConSelect1
                    data={{
                      UserContributionCountry: this.state
                        .UserContributionCountry,
                      changeContribution: this.changeContribution.bind(this),
                    }}
                  />
                </View>

                <View>
                  <TouchableOpacity
                    onPress={this.onclickReg}
                    // onPress={this.UserRegistrationFunction}

                    style={styles.buttoncreate}>
                    <Text style={styles.text2create}>Register</Text>
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
  rootcreate: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundcreate: {
    flex: 1,
  },
  rect2create: {
    flex: 1,
  },
  icon: {
    color: '#fff',
    alignSelf: 'center',
    marginRight: 10,
  },
  icon7create: {
    color: '#075E54',
    fontSize: 40,
    marginLeft: 10,
    marginTop: 13,
    marginRight: 10,
  },
  icon5pass: {
    color: '#fff',
    fontSize: 22,

    marginRight: 20,
    alignSelf: 'center',
  },

  text3create: {
    color: '#075E54',
    fontSize: 40,
    marginTop: 30,
    marginLeft: 12,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  formcreate: {
    flex: 1,
    marginTop: 30,
  },
  namecreate: {
    height: 59,
    backgroundColor: '#075E54',
    borderRadius: 5,
    flexDirection: 'row',
  },
  namesureecreate: {
    height: 59,
    backgroundColor: '#075E54',
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: 10,
  },
  icon5create: {
    color: '#fff',
    fontSize: 30,
    width: 33,
    height: 33,
    marginLeft: 15,
    alignSelf: 'center',
  },

  nameInputcreate: {
    height: 50,
    color: '#fff',
    fontSize: 14,
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    alignSelf: 'center',
  },
  rowcreate: {
    flexDirection: 'row',
    alignSelf: 'center',
  },

  progressBarColumncreate: {
    marginLeft: 20,
    marginRight: 20,
  },
  progressBarColumnFillercreate: {
    flex: 1,
  },

  buttoncreate: {
    height: 55,
    backgroundColor: '#075E54',
    borderRadius: 5,
    borderColor: '#075E54',
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: 55,
    marginTop: 20,
  },
  text2create: {
    width: 100,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 20,
  },
  datePickerStyle: {
    width: 200,
    alignSelf: 'center',
  },
});
