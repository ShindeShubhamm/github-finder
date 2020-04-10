import React, { useReducer } from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import {
  SEARCH_USERS,
  SET_LOADING,
  GET_USER,
  GET_REPOS,
  CLEAR_USERS,
  RESET
} from '../types'

let githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
let githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState)

  // Search Users
  const searchUsers = async (text) => {
    setLoading()
    const res = await axios
      .get(`https://api.github.com/search/users?q=${encodeURIComponent(text)}&client_id=${githubClientId}&client_secret=${githubClientSecret}`)

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    })
  }

  // reset
  const resetPrevious = () => dispatch({ type: RESET })

  // Get User
  const getUser = async (username) => {
    resetPrevious()
    setLoading()
    const res = await axios
      .get(`https://api.github.com/users/${encodeURIComponent(username)}?&client_id=${githubClientId}&client_secret=${githubClientSecret}`)

    dispatch({
      type: GET_USER,
      payload: res.data
    })
  }

  // Get Repos
  const getUserRepos = async (username) => {
    resetPrevious()
    setLoading()
    const res = await axios
      .get(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`)

    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  }

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS })

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING })


  return <GithubContext.Provider
    value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos
    }}
  >
    {props.children}
  </GithubContext.Provider>
}

export default GithubState;