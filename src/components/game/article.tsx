import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Button,
} from "react-native";
import { getTokens, setTokens } from "../../misc";
import { userOperations } from "../../store/user";

const ArticleComponent = (props) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setAuth] = useState(false);
  const params = props.navigation.state.params;

  useEffect(() => {
    if (props.User.localId) {
      setTokens(props.User, () => {
        setLoading(false);
        setAuth(true);
      });
      return;
    }
    getTokens((value) => {
      if (value[0][1] === null) {
        setAuth(false);
        setLoading(false);
        return;
      }
      props.autoSign(value[1][1]);
    })
  }, [props.User.localId]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator/>
      </View>
    )
  }

  return (
    <ScrollView style={styles.wrapper}>
      {isAuth
        ? (
          <Video
            source={{uri: params.play}}
            style={styles.video}
            paused={true}
            muted={true}
            controls={true}
          />
        )
        : (
          <View style={styles.noAuth}>
            <Icon
              name="emoticon-sad-outline"
              size={80}
              color="#d5d5d5"
            />
            <Text style={styles.noAuthText}>
              We are sorry, you need to be registered/logged to see this page
            </Text>
            <Button
              title="Login / Register"
              onPress={() => {props.navigation.navigate('Login')}}
            />

          </View>
        )
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    backgroundColor: '#F0F0F0',
  },
  noAuth: {
    flex: 1,
    margin: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAuthText: {
    fontFamily: 'Roboto-Bold',
  },
  video: {
    width: '100%',
    height: 250,
  },
});

const mapStateToProps = (state) => ({
  User: state.userStore.user,
});

const mapDispatchToProps = (dispatch: any) => ({
  autoSign: (refreshToken: string) => dispatch(userOperations.autoSignIn(refreshToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleComponent);
