import './App.css';

import Nav from './components/nav/Nav';
import YoutubeConvertPage from './view/pages/youtube/youtube';
import InstgramConvertPage from './view/pages/instgram/instgram';
import Home from './view/pages/home/home'
import FacebookConvertPage from './view/pages/facebook/facebook'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useLocation,
  useParams,
  HashRouter
} from "react-router-dom";
import { createBrowserHistory } from "history";
 function App() {
  const history = createBrowserHistory();

  return (
    // <div>
    //   <Nav />
    //   <Home />
    // </div>
     <HashRouter>
    <HashRouter>
      <div className="app">
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200;300;400;500;531;600;700;800&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        ></link>
        <Nav />
        <div className="mainPage">
          <Switch>
            <Route exact={true} path="/">
              <Home />
            </Route>
            <Route exact={true} path="/home">
              <Home />
            </Route>
            <Route path="/InstgramConvertPage">
              <InstgramConvertPage />
            </Route>
            <Route path="/FacebookConvertPage">
              <FacebookConvertPage />
            </Route>
            <Route path="/YoutubeConvertPage">
              <YoutubeConvertPage />
            </Route>
          
          
          </Switch>
        </div>
      </div>
    </HashRouter>

     </HashRouter>
  );
}

export default App;
