import React from 'react';

const SingleRepo = (props) => (
  <div style={{border: 'black solid'}}>
    <div>GitHub Handle: {props.repo.githubHandle}</div>
    <div><a href={props.repo.repoUrl}>Repo Name: {props.repo.repoName}</a></div>
    <div>Repo Size: {props.repo.repoSize}</div>
    <div>Repo Stargazer Count: {props.repo.favorites}</div>
  </div>
)

export default SingleRepo;