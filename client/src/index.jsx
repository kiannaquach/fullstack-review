import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  getRepos(term) {
    $.ajax({
      url: '/repos',
      method: 'GET',
      success: (data) => {
        this.setState ({
          repos: data
        })
      },
      error: function(err) {
        console.log("YOU FAILED: ", err)
      }
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      method: 'POST',
      data: {term},
      success: (data) => {
        console.log('KIANNA YOU CONNECTED: ', data)
        this.getRepos(term);
      },
      error: function(err) {
        console.log('YOU HAVE FAILED: ', err)
      }
    });
  }

  render () {
    this.getRepos();
    return (<div>
      <h1>GITHUB FETCHER</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));