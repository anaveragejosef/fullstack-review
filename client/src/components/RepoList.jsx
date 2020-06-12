import React from 'react';
import SingleRepo from './SingleRepo.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <div>
      {props.repos.map(repo => <SingleRepo repo={repo}/>)}
    </div>
  </div>
)

export default RepoList;