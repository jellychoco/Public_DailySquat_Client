/* eslint-disable no-unused-vars */
// import React from 'react';
import './App.css';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Ing from './Pages/Ing';
import Mypage from './Pages/Mypage';
import Result from './Pages/Result';
import Start from './Pages/Start';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Switch, Route, Redirect } from 'react-router-dom';

import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      count: null,
      exercise: null,
      selecCount: null,
      userInfo: {
        name: null,
        email: null,
        age: null,
        gender: null,
        createdAt: null,
      },
      totalCount: 0,
    }
    this.selectExercise = this.selectExercise.bind(this);
  }

  handleCounting(count) {
    this.setState({
      count: count
    })
    console.log("this is app.js state", this.state.count)
  }

  handleIsLogin() {
    this.setState({ isLogin: true });
  }

  // handleIsLoginChange() {
  //   this.setState({ isLogin: true });
  //   axios.get('http://localhost:4000/user').then(res => {
  //     console.log(res.data);
  //     this.setState({ userinfo: res.data });
  //   });
  // }
  selectExercise(data) {
    this.setState({
      exercise: data
    })
  }

  selectCount(data) {
    this.setState({
      selecCount: Number(data)
    })
  }

  getUserInfo = () => {
    fetch('http://localhost:4000/users/info', {
      method: 'GET',
      headers: {
        accessToken: JSON.stringify(localStorage.getItem('dailySquatToken')),
      }
    })
      .then((data) => {
        return data.json();
      })
      .then((userInfo) => {
        this.setState({
          userInfo: {
            name: userInfo.name,
            email: userInfo.email,
            age: userInfo.age,
            gender: userInfo.gender,
            createdAt: userInfo.createdAt,
          }
        })
      })
  }

  getTotalCount = () => {
    fetch('http://localhost:4000/count/getTotalCount/1', {
      method: 'GET',
      headers: {
        accessToken: JSON.stringify(localStorage.getItem('dailySquatToken')),
      }
    })
      .then((data) => {
        return data.json();
      })
      .then((value) => {
        console.log(value.totalCount)
        this.setState({
          totalCount: value.totalCount
        })
      })
  }


  render() {
    const { isLogin } = this.state;
    const handleIsLogin = this.handleIsLogin.bind(this)
    
    return (
      <div>

        <Switch>
          <Route path="/Login" render={(...routeProps) => {
            if (this.state.isLogin) {
              return <Redirect to="/Home" />;
            }
            return <Login isLogin={isLogin} handleIsLogin={handleIsLogin} {...routeProps} />
          }} />
          <Route exact path="/Home" render={() => <Home isLogin={this.state.isLogin} selectExercise={this.selectExercise} getUserInfo={this.getUserInfo.bind(this)} getTotalCount={this.getTotalCount.bind(this)}/>} />

          <Route exact path="/Mypage" render={() => <Mypage userInfo={JSON.stringify(this.state.userInfo)} totalCount={this.state.totalCount} />} />

          <Route exact path="/Start" render={() => <Start selectCount={this.selectCount.bind(this)} />} />

          <Route exact path="/Ing" render={() => <Ing handleCounting={this.handleCounting.bind(this)} selecCount={this.state.selecCount} exercise={this.state.exercise} />} />

          <Route exact path="/Result" render={() => <Result count={this.state.count} />} />

          <Route
            path="/"
            render={() => {
              return <Redirect to="/Login" />;
            }}
          />
        </Switch>


      </div>
    )
  }
}

export default App

// if (this.state.isLogin) {
//   return <Redirect to = "/Home" />;
// }

