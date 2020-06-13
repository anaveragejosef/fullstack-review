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
    this.getRepos = this.getRepos.bind(this);
  }

  search (term) {
    // console.log(`${term} was searched`);
    // TODO - POST Request
    $.post('/repos', {search: term}, success => {
      this.getRepos();
    });
    // Ignore success for now / Will call GET on return to load results
  }

  // GET Request for Top 25 Repos
  getRepos () {
    $.get('/repos', topRepos => {
      this.setState({
        repos: topRepos
      });
    });
  }
  // Use component lifecycle to render on load/refresh
  componentDidMount() {
    this.getRepos();
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));