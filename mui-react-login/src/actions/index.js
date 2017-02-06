import { CALL_API, Schemas } from '../middleware/api'

export const LOGGING_IN = 'LOGGING_IN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
export const loginUser = (login, password) => (dispatch, getState) => {
  console.log("dispatch");
  return dispatch({
    [CALL_API]: {
      types: [ LOGGING_IN, LOGIN_SUCCESS, LOGIN_FAILURE ],
      endpoint: `login`,
      data:{username:login, password:password}
    }
  })
}

export const API_LOADING = 'API_LOADING'
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS'
export const PROFILE_FAILURE = 'PROFILE_FAILURE'

export const loadUserProfile = (userId) => (dispatch, getState) => {
  console.log("dispatch load user");
  return dispatch({
    [CALL_API]: {
      types: [ API_LOADING, PROFILE_SUCCESS, PROFILE_FAILURE ],
      endpoint: userId + '/profile',
      data:{}
    }
  })
}

export const MODAL_LOADING = 'MODAL_LOADING'
export const HIMAGES_SUCCESS = 'HIMAGES_SUCCESS'
export const HIMAGES_FAILURE = 'HIMAGES_FAILURE'

export const loadHoistcamImages = () => (dispatch, getState) => {
  console.log("dispatch load hoistcam");
  return dispatch({
    [CALL_API]: {
      types: [ MODAL_LOADING, HIMAGES_SUCCESS, HIMAGES_FAILURE ],
      endpoint: "http://162.252.86.13:8090/listfile.php?name=02804",
      data:{}
    }
  })
}

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchUser = login => ({
  [CALL_API]: {
    types: [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
    endpoint: `users/login`,
    schema: Schemas.USER
  }
})

// Fetches a single user from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadUser = (login, requiredFields = []) => (dispatch, getState) => {
  const user = getState().entities.users[login]
  if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
    return null
  }

  return dispatch(fetchUser(login))
}

export const REPO_REQUEST = 'REPO_REQUEST'
export const REPO_SUCCESS = 'REPO_SUCCESS'
export const REPO_FAILURE = 'REPO_FAILURE'

// Fetches a single repository from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchRepo = fullName => ({
  [CALL_API]: {
    types: [ REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE ],
    endpoint: `repos/${fullName}`,
    schema: Schemas.REPO
  }
})

// Fetches a single repository from Github API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadRepo = (fullName, requiredFields = []) => (dispatch, getState) => {
  const repo = getState().entities.repos[fullName]
  if (repo && requiredFields.every(key => repo.hasOwnProperty(key))) {
    return null
  }

  return dispatch(fetchRepo(fullName))
}

export const STARRED_REQUEST = 'STARRED_REQUEST'
export const STARRED_SUCCESS = 'STARRED_SUCCESS'
export const STARRED_FAILURE = 'STARRED_FAILURE'

// Fetches a page of starred repos by a particular user.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchStarred = (login, nextPageUrl) => ({
  login,
  [CALL_API]: {
    types: [ STARRED_REQUEST, STARRED_SUCCESS, STARRED_FAILURE ],
    endpoint: nextPageUrl,
    schema: Schemas.REPO_ARRAY
  }
})

// Fetches a page of starred repos by a particular user.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const loadStarred = (login, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `users/${login}/starred`,
    pageCount = 0
  } = getState().pagination.starredByUser[login] || {}

  if (pageCount > 0 && !nextPage) {
    return null
  }

  return dispatch(fetchStarred(login, nextPageUrl))
}

export const STARGAZERS_REQUEST = 'STARGAZERS_REQUEST'
export const STARGAZERS_SUCCESS = 'STARGAZERS_SUCCESS'
export const STARGAZERS_FAILURE = 'STARGAZERS_FAILURE'

// Fetches a page of stargazers for a particular repo.
// Relies on the custom API middleware defined in ../middleware/api.js.
const fetchStargazers = (fullName, nextPageUrl) => ({
  fullName,
  [CALL_API]: {
    types: [ STARGAZERS_REQUEST, STARGAZERS_SUCCESS, STARGAZERS_FAILURE ],
    endpoint: nextPageUrl,
    schema: Schemas.USER_ARRAY
  }
})

// Fetches a page of stargazers for a particular repo.
// Bails out if page is cached and user didn't specifically request next page.
// Relies on Redux Thunk middleware.
export const loadStargazers = (fullName, nextPage) => (dispatch, getState) => {
  const {
    nextPageUrl = `repos/${fullName}/stargazers`,
    pageCount = 0
  } = getState().pagination.stargazersByRepo[fullName] || {}

  if (pageCount > 0 && !nextPage) {
    return null
  }

  return dispatch(fetchStargazers(fullName, nextPageUrl))
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})

export const ACTIVE_TAB_CHANGE = 'ACTIVE_TAB_CHANGE'

export const setActiveTab =  (e) => ({
  type:ACTIVE_TAB_CHANGE,
  tab: e.tab
})


export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

export const openModalComponent = (e)  => ({
  type: OPEN_MODAL,
  page: e.page
})

export const closeModalComponent = (e)  => ({
  type: CLOSE_MODAL,
  page: e.page
})

export const SELECT_FOLDER = 'SELECT_FOLDER'
export const RESET_FOLDER = 'RESET_FOLDER'

export const selectFolder = (e)  => ({
  type: SELECT_FOLDER,
  folderIndex: e.index
})

export const resetFolderSelection = (e)  => ({
  type: RESET_FOLDER
})

export const TOGGLE_IMAGE_SELECTION = 'TOGGLE_IMAGE_SELECTION'

export const toggleSelectedImages = (path) => ({
  type: TOGGLE_IMAGE_SELECTION,
  path: path
})

export const SELECT_HOW = 'SELECT_HOW'

export const setSelectedHow = (mode) => ({
  type: SELECT_HOW,
  mode: mode
})

export const SELECT_WHERE = 'SELECT_WHERE'

export const setSelectedWhere = (mode) => ({
  type: SELECT_WHERE,
  mode: mode
})


