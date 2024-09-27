import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./Components/pages/Blog/Create";
import BlogDetails from "./Components/pages/Blog/BlogDetails";
import NotFound from "./NotFound";
import BlogHome from "./Components/pages/Blog/BlogHome";
import Homepage from "./Components/pages/Homepage/Homepage";
import "./App.css";
import Login from "./Components/pages/LoginPage/Login";
import BookingPage from "./Components/pages/BookingPage/BookingPage";
import SignUpPage from "./Components/pages/SignUp/SignUpPage";
import { Profile } from "./Components/pages/UserProfile/Profile";
import AboutUs from "./Components/pages/AboutUs/AboutUs";
import CommentList from "./Components/pages/Blog/CommentList";
import AppSubmitted from "./Components/pages/BookingPage/AppSubmitted";
import AppointmentDisplay from "./Components/pages/AppointmentDisplay/AppointmentDisplay";
import AppointmentList from "./Components/pages/AppointmentDisplay/AppointmentList";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/profile/:id">
              <Profile />
            </Route>
            <Route exact path="/signup">
              <SignUpPage />
            </Route>
            <Route exact path="/aboutus">
              <AboutUs />
            </Route>
            <Route exact path="/BlogHome">
              <BlogHome />
            </Route>
            <Route exact path="/create">
              <Create />
            </Route>
            <Route exact path="/blogs/:BlogId">
              <BlogDetails />
            </Route>
            <Route exact path="/Login">
              <Login />
            </Route>
            <Route exact path="/comments/:BlogId">
              <CommentList />
            </Route>
            <Route exact path="/BookingPage">
              <BookingPage />
            </Route>
            <Route exact path="/AppSubmitted">
              <AppSubmitted />
            </Route>
            <Route exact path="/AppointmentDisplay">
              <AppointmentDisplay />
              <Route />
              <Route path="/appointments/:appointment_id">
                <AppointmentList />
              </Route>
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
