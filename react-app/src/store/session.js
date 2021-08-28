// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const LOAD_USER = 'session/LOAD_USER'
const LOAD_PROJECT = 'projects/LOAD_PROJECT';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const loadUsers = (user) => ({
  type: LOAD_USER,
  user
})

const loadProject = (project) => ({
  type: LOAD_PROJECT,
  project
});

const initialState = { user: null };

export const getProjects = () => async (dispatch) => {
  const res = await fetch(`/api/auth/projects`)
  const allProjects = await res.json();
  dispatch(loadProject(allProjects));
  return allProjects
}

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
  
    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  
  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const getUsers = () => async (dispatch) => {
  const res = await fetch(`/api/auth/users`)
  const allUsers = await res.json();
  dispatch(loadUsers(allUsers));
  return allUsers;
}



export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    case LOAD_USER:
            const all = {...state};
            action.user.users.forEach((oneUser) => {
                all[oneUser.id] = oneUser;
            });
            return all;
            case LOAD_PROJECT:
              // console.log('projectjh', action.project)
              const all1 = {...state};
              action.project.Projects.forEach((oneProject) => {
                  all1[oneProject.id] = oneProject;
              });
              return all1;       
    default:
      return state;
  }
}
