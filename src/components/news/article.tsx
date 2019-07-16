import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
} from "react-native";
import Moment from 'moment';

const ArticleComponent = (props) => {

  const params = props.navigation.state.params;

  const formatContent = (content: string) => {
    return content.replace(/<p>/g, '').replace(/<\/p>/g, '')
  };

  return (
    <ScrollView style={styles.wrapper}>
      <Image
        source={{uri: params.image}}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.articleBody}>
        <Text style={styles.articleTitle}>
          {params.title}
        </Text>
        <Text style={styles.articleData}>
          {params.team} - Posted at {Moment(params.date).format('d MMMM')}
        </Text>
        <View style={styles.articleContent}>
          <Text style={styles.articleText}>
            {formatContent(params.content)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f0f0f0',
  },
  image: {
    height: 250,
  },
  articleBody: {
    padding: 10,
  },
  articleTitle: {
    fontSize: 23,
    color: '#323232',
    fontFamily: 'Roboto-Bold',
  },
  articleData: {
    fontSize: 12,
    color: '#828282',
    fontFamily: 'Roboto-Light',
  },
  articleContent: {
    marginTop: 30
  },
  articleText: {
    fontSize: 14,
    fontFamily: 'Roboto-Light',
    lineHeight: 20,
  },
});

export default ArticleComponent;
