import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <br/>
    <br/>
    	<h4>Top 25 Less Than FOUR Forked Repos</h4>
    {
    	props.repos.slice(0, 26).map((repo, i) => {
	    	return <div><strong>{repo.user}</strong>: {repo.name}</div>
    	})
    }

  </div>
)

export default RepoList;

