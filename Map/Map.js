import React from 'react';
import {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

import MapView from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Items from '../MoreItems/MapAnimatedClick';

const Images = [require('../assets/logoapp.png')];
const imageuri = {uri: 'https://reactjs.org/logo-og.png'};

const {width, height} = Dimensions.get('window');

const CARD_HEIGHT = height / 7;
const CARD_WIDTH = CARD_HEIGHT - -190;

export default class screens extends Component {
  state = {
    searchKeyword: '',
    modalVisible: false,

    searchResults: [],
    isShowingResults: false,
    markers: [
      {
        coordinate: {
          latitude: 45.524548,
          longitude: -122.6749817,
        },
        title: 'Best Place',
        description: 'This is the best place in Portland',
        image: imageuri,
        rate: '$230',
      },
      {
        coordinate: {
          latitude: 45.524698,
          longitude: -122.6655507,
        },
        title: 'Second Best Place',
        description:
          'This is the second best place in Portland This is the second best place in PortlandThis is the second best place in Portland',
        image: Images[0],
        rate: '$211',
      },
      {
        coordinate: {
          latitude: 45.5230786,
          longitude: -122.6701034,
        },
        title: 'Third Best Place',
        description: 'This is the third best place in Portland',
        image: Images[0],
        rate: '$500',
      },
      {
        coordinate: {
          latitude: 45.521016,
          longitude: -122.6561917,
        },
        title: 'Fourth Best Place',
        description: 'This is the fourth best place in Portland',
        image: Images[0],
        rate: '$800',
      },
      {
        coordinate: {
          latitude: 45.524548,
          longitude: -122.6849817,
        },
        title: 'Best Place',
        description: 'This is the best place in Portland',
        image: Images[0],
        rate: '$50',
      },
    ],
    region: {
      latitude: 45.52220671242907,
      longitude: -122.6653281029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };
  updateSearch = search => {
    this.setState({search});
  };

  UNSAFE_componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here

    this.animation.addListener(({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const {coordinate} = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350,
          );
        }
      }, 10);
    });
  }

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  render() {
    const {modalVisible} = this.state;

    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        (index + 1) * CARD_WIDTH,
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 2.5, 1],
        extrapolate: 'clamp',
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: 'clamp',
      });
      return {scale, opacity};
    });
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.autocompleteContainer}>
            <MaterialCommunityIcons
              style={styles.searchIcon}
              name="arrow-left"
              size={20}
              color="#000"
            />

            <TextInput
              placeholder="Nearby Search"
              returnKeyType="search"
              style={styles.searchBox}
              placeholderTextColor="#000"
              editable={false}
              value={this.state.searchKeyword}
            />

            <MaterialCommunityIcons
              style={styles.menuIcon}
              name="tune"
              size={20}
              color="#000"
            />
            <View style={styles.refreshContainer}>
              <MaterialCommunityIcons
                style={styles.refreshIcon}
                name="refresh"
                color="#000"
              />
              <TextInput
                placeholder="Search this area"
                returnKeyType="search"
                style={styles.refreshBox}
                placeholderTextColor="#000"
                editable={false}
              />
            </View>

            <View></View>
          </View>

          <MapView
            ref={map => (this.map = map)}
            initialRegion={this.state.region}
            style={styles.container}>
            {this.state.markers.map((marker, index) => {
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale,
                  },
                ],
              };
              const opacityStyle = {
                opacity: interpolations[index].opacity,
              };

              return (
                <MapView.Marker
                  title={marker.rate}
                  description={'sivasankar'}
                  key={index}
                  coordinate={marker.coordinate}>
                  <Animated.View style={[styles.markerWrap, opacityStyle]}>
                    <Animated.View style={[styles.ring, scaleStyle]} />
                    <View style={styles.marker} />
                  </Animated.View>
                </MapView.Marker>
              );
            })}
          </MapView>

          <Animated.ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: this.animation,
                    },
                  },
                },
              ],
              {useNativeDriver: true},
            )}
            style={styles.scrollView}
            contentContainerStyle={styles.endPadding}>
            {this.state.markers.map((marker, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  this.props.navigation.navigate('CardItem', {
                    Image: marker.image,
                    title: marker.title,
                    address: marker.description,
                  })
                }>
                <View style={styles.card} key={index}>
                  <Image source={marker.image} style={styles.cardImage} />
                  <TouchableWithoutFeedback
                    onPress={() => alert('Added Successfully')}>
                    <MaterialCommunityIcons
                      name="heart"
                      color={'#000'}
                      style={{
                        position: 'absolute',
                        right: 10,
                        top: 10,
                        fontSize: 20,
                      }}
                    />
                  </TouchableWithoutFeedback>
                  <View style={styles.textContent}>
                    <Text numberOfLines={1} style={styles.cardtitle}>
                      {marker.title}
                    </Text>
                    <Text numberOfLines={1} style={styles.cardDescription}>
                      {marker.description}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </Animated.ScrollView>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              this.setModalVisible(!modalVisible);
            }}>
            <Items />
          </Modal>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 500,
    marginTop: 10,
  },
  scrollView: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 8, y: -8},
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
    borderRadius: 10,
  },
  refreshIcon: {
    marginLeft: 10,
    zIndex: 99,
    top: 38,
    fontSize: 25,
  },
  refreshContainer: {
    zIndex: 1,
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
  },
  refreshBox: {
    width: 200,
    height: 50,
    fontSize: 14,
    borderRadius: 40,
    paddingVertical: 0,
    fontWeight: 'bold',
    paddingHorizontal: 40,
    color: '#000',
    backgroundColor: '#fff',
  },
  cardImage: {
    width: 90,
    height: 100,
    resizeMode: 'stretch',
    marginBottom: 100,
  },
  textContent: {
    position: 'absolute',
    marginLeft: 120,
    top: 40,
  },
  cardtitle: {
    fontSize: 18,

    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 15,
    color: '#444',
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(130,4,150, 0.9)',
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(130,4,150, 0.3)',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(130,4,150, 0.5)',
  },
  search: {
    borderRadius: 20,
    marginBottom: 200,
    backgroundColor: '#fff',
  },
  autocompleteContainer: {
    zIndex: 1,
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
  },
  searchBox: {
    width: 340,
    height: 50,
    fontSize: 14,
    borderRadius: 40,
    paddingVertical: 0,
    paddingHorizontal: 40,
    color: '#000',
    backgroundColor: '#fff',
  },
  searchIcon: {
    marginLeft: 10,
    zIndex: 99,
    top: 38,
    fontSize: 25,
  },
  barIcon: {
    marginLeft: 100,
    zIndex: 99,
    top: 38,
    fontSize: 25,
  },
  menuIcon: {
    position: 'absolute',
    fontSize: 25,
    right: 30,
    top: 38,
  },
});
