import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './routes/Home';
import Register from './routes/Register';
import Find from './routes/Find';
import Chat from './routes/Chat';
import Login from './routes/Login';
import Mypage from './routes/MyPage';
import NotFound from './routes/NotFound';

import Header from './components/Header';

function App() {
  return (
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
  );
}

export default App;
