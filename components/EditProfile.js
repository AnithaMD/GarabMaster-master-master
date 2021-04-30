import React, {useState} from 'react';
import {Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ConSelect from '../CountrySelectEdit/ContributionCountryEdit';
import ConSelect1 from '../CountrySelectEdit/ResidentialCountryEdit';
import {TextInputMask} from 'react-native-masked-text';

import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';

import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UserResidenceCountry1Edit: '',
      UserContributionCountryEdit: '',
      UserNameEdit: '',
      UserSurnameEdit: '',
      dt: '',
      UserEmailEdit: '',

      Residentaladdress: '',

      genderselection: '',
    };
  }
  /////////////resident country get ///////////
  changeresident(item) {
    this.setState({UserResidenceCountry1Edit: item});
  }

  ////////contribution country get ///////////////
  changeContribution(item) {
    this.setState({UserContributionCountryEdit: item});
  }

  //////////////validate name and Email Input/////////////////////
  validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  validateName = string => {
    return !/[^a-zA-Z]/.test(string);
  };

  onclickValidate = () => {
    const {UserNameEdit, UserSurnameEdit, UserEmailEdit} = this.state;

    if (
      UserNameEdit == '' ||
      UserNameEdit.length < 4 ||
      this.validateName(UserNameEdit) === false
    ) {
      this.refs.NameField.focus();
      return false;
    } else if (
      UserSurnameEdit == '' ||
      UserSurnameEdit.length < 4 ||
      this.validateName(UserSurnameEdit) === false
    ) {
      this.refs.SurNameField.focus();
      return false;
    } else if (UserEmailEdit == '') {
      this.refs.EmailField.focus();
      return false;
    } else if (this.validateEmail(UserEmailEdit) === false) {
      this.refs.EmailField.focus();
      return false;
    } else {
      return true;
    }
  };

  onclickSave = () => {
    const {
      UserNameEdit,
      UserSurnameEdit,
      UserEmailEdit,
      dt,
      genderselection,
      UserResidenceCountry1Edit,
      UserContributionCountryEdit,
      Residentaladdress,
    } = this.state;
    if (this.onclickValidate()) {
      // fetch("http://40.91.193.97:8080/ModifyPersonalDetails?AppType=CLI&UserID=1000118&Gender=" + genderselection + "&ClientName=" + UserNameEdit + "&ClientSurname=" + UserSurnameEdit + "&BirthDate=" + dt + "&Mail=" + UserEmailEdit + "&ResidenceCountry=" + UserResidenceCountry1Edit + "&ContribCountry=" + UserContributionCountryEdit + "&Adress=" + Residentaladdress + "&TopAutoAccount=Y&Err=0&Msg=KOOO",{
      // method:'PUT',
      // headers:{
      // 'Content-Type': 'application/json',
      // 'Accept': 'application/json',
      // }

      // }).then((response) => response.json())
      // .then((editdata)=>{
      // if(editdata.Err===0){
      // alert("ok ")
      // }
      // else{
      // alert("please check inputs")
      // }
      // }).catch(console.error())

      alert('Ok');
    }
  };

  render() {
    return (
      <View style={styles.rootedit}>
        <StatusBar barStyle="dark-content" backgroundColor="#075E54" />

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always">
          <View style={styles.backgroundedit}>
            <View style={styles.progressBarColumnedit}>
              <Text style={styles.text3edit}>EDIT PROFILE</Text>
              <View style={styles.formcreate}>
                <View style={styles.nameedit}>
                  <EvilIconsIcon
                    name="user"
                    style={styles.icon5edit}></EvilIconsIcon>
                  <TextInput
                    ref="NameField"
                    onChangeText={UserNameEdit => this.setState({UserNameEdit})}
                    selectionColor={'white'}
                    placeholder="Name"
                    placeholderTextColor="#D3D3D3"
                    secureTextEntry={false}
                    style={styles.nameInputedit}></TextInput>
                </View>
                <View style={styles.namesureeedit}>
                  <EvilIconsIcon
                    name="user"
                    style={styles.icon5edit}></EvilIconsIcon>
                  <TextInput
                    ref="SurNameField"
                    onChangeText={UserSurnameEdit =>
                      this.setState({UserSurnameEdit})
                    }
                    selectionColor={'white'}
                    placeholder="Surename"
                    placeholderTextColor="#D3D3D3"
                    secureTextEntry={false}
                    style={styles.nameInputedit}></TextInput>
                </View>
                <View style={styles.namesureeedit}>
                  <MaterialCommunityIcons
                    name="calendar-month"
                    style={styles.icon5edit}></MaterialCommunityIcons>
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
                    onPress={(data, details = null) => {}}
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

                <View style={styles.namesureeedit}>
                  <MaterialCommunityIcons
                    name="email"
                    style={styles.icon5edit}></MaterialCommunityIcons>
                  <TextInput
                    ref="EmailField"
                    onChangeText={UserEmailEdit =>
                      this.setState({UserEmailEdit})
                    }
                    selectionColor={'white'}
                    placeholder="Email Address"
                    placeholderTextColor="#D3D3D3"
                    secureTextEntry={false}
                    style={styles.nameInputedit}></TextInput>
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
                      UserResidenceCountry1Edit: this.state
                        .UserResidenceCountry1Edit,
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

                  <ConSelect
                    data={{
                      UserContributionCountryEdit: this.state
                        .UserContributionCountryEdit,
                      changeContribution: this.changeContribution.bind(this),
                    }}
                  />
                </View>

                <View>
                  <TouchableWithoutFeedback style={styles.button}>
                    <Text style={styles.text2edit}>Save</Text>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </View>

          <View>
            <TouchableOpacity style={styles.button} onPress={this.onclickSave}>
              <Text style={styles.text2edit}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootedit: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundedit: {
    flex: 1,
  },

  text3edit: {
    color: '#075E54',
    fontSize: 30,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 12,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  nameedit: {
    height: 59,
    backgroundColor: '#075E54',
    borderRadius: 5,
    flexDirection: 'row',
  },
  namesureeedit: {
    height: 59,
    backgroundColor: '#075E54',
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: 10,
  },
  namesureeedit1: {
    height: 59,
    backgroundColor: '#075E54',
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: 10,
    zIndex: 2,
  },
  icon5edit: {
    color: '#fff',
    fontSize: 33,
    width: 33,
    height: 33,
    marginLeft: 15,

    alignSelf: 'center',
  },
  nameInputedit: {
    height: 40,
    color: '#fff',
    fontSize: 14,
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    alignSelf: 'center',
  },

  progressBarColumnedit: {
    marginLeft: 20,
    marginRight: 20,
  },

  buttonedit: {
    height: 55,
    backgroundColor: '#075E54',
    borderRadius: 5,
    borderColor: '#075E54',
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: 55,
    marginTop: 20,
  },
  button: {
    height: 55,
    backgroundColor: '#075E54',
    borderRadius: 5,
    borderColor: '#075E54',
    borderWidth: 1,
    justifyContent: 'center',

    margin: 20,
  },
  text2edit: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 20,
  },
  namesureecreate: {
    height: 59,
    backgroundColor: '#075E54',
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: 10,
  },
});
