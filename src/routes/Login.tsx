import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import config from '../config/firebaseConfig';

firebase.initializeApp(config);

function Login() {
  const [state, setState] = useState({
    isSignedIn: false,
  });

  // console.log('config', config)

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setState({ isSignedIn: !!user });
      });

    return () => {
      unregisterAuthObserver();
    };
  }, []);

  if (state.isSignedIn) {
    // console.log('firebase.auth().currentUser', firebase.auth().currentUser?.refreshToken);
    firebase
      .auth()
      .currentUser!.getIdToken(/* forceRefresh */ true)
      .then(function(idToken) {
        // console.log('idToken', idToken);
      })
      .catch(function(error) {
        // console.log(error);
      });
  }
  return (
    <div>
      {state.isSignedIn ? (
        <div>
          <div>
            {' '}
            You are signed in,
            {firebase.auth().currentUser!.displayName}{' '}
          </div>
          <button type="button" onClick={() => firebase.auth().signOut()}>
            {' '}
            Sign out
          </button>
        </div>
      ) : (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </div>
  );
}

export default Login;
