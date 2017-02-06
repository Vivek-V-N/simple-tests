import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import paginate from './paginate'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { users: {}, repos: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

/* Might be needed later
const activeTab = (state = "dashboard", action) => {
  const { type, tab } = action
  if (type === ActionTypes.ACTIVE_TAB_CHANGE) {
    return action.tab;
  } else  {
    return state;
  }
  return state;
}*/

const user = (state = null, action) => {
  const { type, response } = action

  if (type === ActionTypes.LOGIN_SUCCESS) {
    return response.username;
  }

  return state
}

const profile = (state = null, action) => {
  const { type, response } = action

  if (type === ActionTypes.PROFILE_SUCCESS) {
    console.log("REsponse for Profile: " + response);
    return response;
  }

  return state
}

const isLoading = (state = null, action) => {
  const { type } = action

  if (type === ActionTypes.API_LOADING) {
    console.log("API LOADING....");
    return true;
  }
  else if (type.indexOf("_SUCCESS") > -1 || type.indexOf("_FAILURE") > -1)
  {
    return false;
  }

  return false;
}

const isModalOpen = (state = false, action) => {
  const { type } = action

  if (type === ActionTypes.OPEN_MODAL) {
    console.log("MODAL LOADING....");
    return true;
  }
  else if (type === ActionTypes.CLOSE_MODAL )
  {
    return false;
  }

  return state;
}

const selectedFolder = (state = -1, action) => {
  const { type, folderIndex } = action

  if (type === ActionTypes.SELECT_FOLDER) {
    console.log("FOLDER SELECTED....");
    return parseInt(folderIndex);
  }
  else if (type === ActionTypes.RESET_FOLDER )
  {
    return -1;
  }

  return state;
}

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

const loadingMessage = (state = null, action) => {
  const { type } = action

  if (type === ActionTypes.LOGGING_IN) {
    return "Logging in..."
  }

  return null
}

var parseHoistCamObjects = function(response) {
  var baseUrl = response.base;
  var folders = [];
  var images = [];
  for(var f in response.links)
  {
    folders.push(f);
    images.push(response.links[f]);
  }
  return {
    baseUrl,
    folders,
    images
  }

}

const hoistcamImages = (state=null, action) => {
  const { type, response } = action
  if(type === ActionTypes.HIMAGES_SUCCESS) {
    return parseHoistCamObjects(response);
  }
  else return state;
}

const selectedHow = (state=null, action) => {
  const { type, mode } = action
  if(type === ActionTypes.SELECT_HOW) {
    return mode;
  }
  else return state;
}

const selectedWhere = (state=null, action) => {
  const { type, mode } = action
  if(type === ActionTypes.SELECT_WHERE) {
    return mode;
  }
  else return state;
}

const selectedImages = (state=[], action) => {
  const { type, path } = action
  console.log("List state" + state.toString());
  if(type === ActionTypes.TOGGLE_IMAGE_SELECTION) {
    var indexOfPath = state.indexOf(path);
    if ( indexOfPath > -1)
      state.splice(indexOfPath, 1);
    else state.push(path);
    console.log("List state After " + state.toString());
    return Array.from(state);
  }
  else return state;
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
  starredByUser: paginate({
    mapActionToKey: action => action.login,
    types: [
      ActionTypes.STARRED_REQUEST,
      ActionTypes.STARRED_SUCCESS,
      ActionTypes.STARRED_FAILURE
    ]
  }),
  stargazersByRepo: paginate({
    mapActionToKey: action => action.fullName,
    types: [
      ActionTypes.STARGAZERS_REQUEST,
      ActionTypes.STARGAZERS_SUCCESS,
      ActionTypes.STARGAZERS_FAILURE
    ]
  })
})

const rootReducer = combineReducers({
  user,
  profile,
  isLoading,
  isModalOpen,
  hoistcamImages,
  selectedFolder,
  selectedImages,
  selectedHow,
  selectedWhere,
  entities,
  pagination,
  errorMessage,
  loadingMessage,
  routing
})

export default rootReducer
