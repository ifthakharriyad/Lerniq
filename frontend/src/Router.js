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
import Channel from "./pages/Channel";
import CoursePage from './pages/CoursePage'

const AppRouter = () => (
  <Router>
    <ScrollToTop />
    <Navbar />
    <Sidebar />
    <BottomBar />
    <Container>
      <Switch>
        <Route path="/watch/:videoId" component={WatchVideo} />
        <Route path="/course/:courseId" component={CoursePage} />
        <Route path="/user/:userId" component={Channel} />
        <Route path="/results/:searchterm" component={SearchResults} />
        <Route path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    </Container>
  </Router>
);

export default AppRouter;
