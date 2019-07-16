import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image, TouchableOpacity,
} from 'react-native';
import { gameOperations } from '../../store/game';

const Games = (props) => {
  useEffect(() => {
    props.getGames();
  }, []);

  const showGames = (list) => (
    list ?
      list.map((game) => (
        <TouchableOpacity
          onPress={() => props.navigation.navigate('GameArticle', {
            ...game
          })}
          key={game.id}
        >
          <View style={styles.gameContainer}>
            <View style={styles.gameBox}>
              <Image
                source={{uri: game.awayData.logo}}
                style={styles.gameBoxImage}
                resizeMode="contain"
              />
              <Text style={styles.gameBoxText}>{game.awayData.wins} - {game.awayData.loss}</Text>
            </View>
            <View style={styles.gameBox}>
              <Text style={styles.gameBoxTime}>{game.time}</Text>
              <Text>{Moment(game.date).format('d MMMM')}</Text>
            </View>
            <View style={styles.gameBox}>
              <Image
                source={{uri: game.localData.logo}}
                style={styles.gameBoxImage}
                resizeMode="contain"
              />
              <Text style={styles.gameBoxText}>{game.localData.wins} - {game.localData.loss}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))
      : null
  );

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.gameList}>
        {
          showGames(props.Games)
        }
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F0F0F0',
  },
  gameList: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  gameContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#dddddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.0,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 2,
  },
  gameBox: {
    width: '33.3%',
    height: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameBoxImage: {
    width: 80,
    height: 80,
  },
  gameBoxText: {
    fontFamily: 'Roboto-Light',
    fontSize: 12,
  },
  gameBoxTime: {
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
  },
});

const mapStateToProps = (state) => ({
  Games: state.gameStore.games
});

const mapDispatchToProps = (dispatch) => ({
  getGames: () => dispatch(gameOperations.getGames()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Games);
