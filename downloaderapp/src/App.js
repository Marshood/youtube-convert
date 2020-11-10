import './App.css';

import Nav from './components/nav/nav';
import Home from './view/pages/home/home'
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
          <Home />

    
    // <HashRouter>
    //   <Nav />
    //   <Home />
    // </HashRouter>
  );
}

export default App;
