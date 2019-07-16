import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Logo from './logo';
import Form from './form';
import { getTokens, setTokens } from '../../misc';
import { userOperations } from '../../store/user';

const Login = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.User.localId) {
      setTokens(props.User, () => {
        setLoading(false);
        goNext();
      })
    }
    getTokens((tokens) => {
      if (!tokens[0][1]) {
        setLoading(false);
        return;
      }
      props.autoSign(tokens[1][1]);
    });
  }, [props.User.localId]);

  const goNext = () => {
    props.navigation.navigate('App');
  };

  if(loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    )
  }
  return (
    <ScrollView style={styles.container}>
      <Logo />
      <Form goNext={() => goNext()}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#1d428a',
    padding: 50,
  },
});

const mapStateToProps = (state) => ({
  User: state.userStore.user,
});

const mapDispatchToProps = (dispatch: any) => ({
  autoSign: (refreshToken: string) => dispatch(userOperations.autoSignIn(refreshToken)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);
