import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

const {height, width} = Dimensions.get('window');
const data = [
  {
    id: 1,
    name: 'France',
    image: {uri: 'https://reactjs.org/logo-og.png'},
  },
  {
    id: 2,
    name: 'China',
    image: {uri: 'https://reactjs.org/logo-og.png'},
  },
  {
    id: 3,
    name: 'India',
    image: {
      uri:
        'https://media.gettyimages.com/photos/the-shop-front-of-supermarket-chain-tesco-is-seen-on-november-22-2020-picture-id1287104127?s=612x612',
    },
  },
  {
    id: 4,
    name: 'Japan',
    image: require('../assets/logo.png'),
  },
  {
    id: 5,
    name: 'Germany',
    image: require('../assets/logo.png'),
  },
];

class Explore extends Component {
  state = {
    favorite: false,
  };

  render() {
    const {favorite} = this.state;

    return (
      <SafeAreaView>
        <View style={{flex: 1}}>
          <ScrollView scrollEventThrottle={16}>
            <View style={styles.cardContainer}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={data}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        this.props.navigation.navigate('ViewAllItems', {
                          ImageView: item.image,
                        })
                      }>
                      <View style={styles.cardStyle}>
                        <View style={styles.innerCardStyle}>
                          <ImageBackground
                            resizeMode="cover"
                            source={item.image}
                            style={styles.image}>
                            <Icon
                              name={'heart-o'}
                              color={'red'}
                              size={30}
                              style={{
                                position: 'absolute',
                                top: 15,
                                right: 15,
                                fontSize: 20,
                              }}
                            />
                          </ImageBackground>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autocompleteContainer: {
    zIndex: 1,
    position: 'absolute',
    top: 20,
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
    fontWeight: 'bold',
    backgroundColor: '#DCDCDC',
  },
  searchIcon: {
    marginLeft: 10,
    zIndex: 99,
    top: 38,
    fontSize: 25,
  },
  menuIcon: {
    position: 'absolute',
    fontSize: 25,
    right: 30,
    top: 40,
  },
  cardContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
  cardStyle: {
    height: 230,
    width: 250,
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
    marginBottom: 20,
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {x: 8, y: -8},
    overflow: 'hidden',
  },
  innerCardStyle: {
    height: 230,
    width: 250,
  },
  image: {
    width: 250,
    height: 230,
  },
});
