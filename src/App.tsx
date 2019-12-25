import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Home from './routes/Home';
import Register from './routes/Register';
import Find from './routes/Find';
import Chat from './routes/Chat';
import Login from './routes/Login';
import Mypage from './routes/MyPage';
import NotFound from './routes/NotFound';

import Header from './components/Header';

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

function App() {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV);

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/find" component={Find} />
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
