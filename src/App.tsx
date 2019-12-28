import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import Home from './routes/Home';
import Register from './routes/Register';
import FindFriend from './routes/FindFriend';
import Chat from './routes/Chat';
import Login from './routes/Login';
import Mypage from './routes/MyPage';
import NotFound from './routes/NotFound';
import Header from './components/Header';
import client from './apollo';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/find" component={FindFriend} />
            <Route path="/chat" component={Chat} />
            <Route path="/login" component={Login} />
            <Route path="/mypage" component={Mypage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
