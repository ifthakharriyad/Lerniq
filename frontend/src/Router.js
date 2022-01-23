import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// components
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import BottomBar from "./components/BottomBar";
import Sidebar from "./components/Sidebar";

// styles
import Container from "./styles/Container";

// pages
import Home from "./pages/Home";
import WatchVideo from "./pages/WatchVideo";
import SearchResults from "./pages/SearchResults";
import Profile from "./pages/Profile";
import Course from './pages/Course'

const AppRouter = () => (
  <Router>
    <ScrollToTop />
    <Navbar />
    <Sidebar />
    <BottomBar />
    <Container>
      <Switch>
        <Route path="/watch/:videoId" component={WatchVideo} />
        <Route path="/course/:courseId" component={Course} />
        <Route path="/user/:userId" component={Profile} />
        <Route path="/results/:searchterm" component={SearchResults} />
        <Route path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    </Container>
  </Router>
);

export default AppRouter;
