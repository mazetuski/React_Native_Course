import React, { useEffect } from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';
import { newsOperations } from '../../store/news';

const News = (props) => {
  useEffect(() => {
    props.getNews();
  }, []);

  const renderArticles = (articles) => {
    return articles.map((article) => (
      <TouchableOpacity
        key={article.id}
        onPress={() => props.navigation.navigate('NewsArticle', {
          ...article
        })}
      >
        <View style={styles.cardWrapper}>
          <Image
            source={{ uri: article.image }}
            style={styles.cardImage}
            resizeMode='cover'
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{article.title}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardFooterTeam}>{article.team} - </Text>
              <Text style={styles.cardFooterDate}>Posted at {Moment(article.date).format('d MMMM')}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView style={styles.wrapper}>
      {renderArticles(props.articles)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f0f0f0',
  },
  cardWrapper: {
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 2,
  },
  cardImage: {
    height: 150,
    justifyContent: 'space-around',
  },
  cardContent: {
    borderWidth: 1,
    borderColor: '#ddd'
  },
  cardTitle: {
    fontFamily: 'Roboto-Bold',
    color: '#232323',
    fontSize: 16,
    padding: 10
  },
  cardFooter: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e6e6e6',
    padding: 10,
  },
  cardFooterTeam: {
    fontFamily: 'Roboto-Bold',
    color: '#828282',
    fontSize: 12
  },
  cardFooterDate: {
    fontFamily: 'Roboto-Light',
    color: '#828282',
    fontSize: 12
  },
});

const mapStateToProps = (state) => ({
  articles: state.newsStore.articles
});

const mapDispatchToProps = (dispatch: any) => ({
  getNews: () => dispatch(newsOperations.getNews()),
});

export default connect(mapStateToProps, mapDispatchToProps)(News);
