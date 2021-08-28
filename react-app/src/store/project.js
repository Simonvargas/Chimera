// action verbs
const ADD_PROJECT= 'projects/ADD_PROJECT';
const LOAD_PROJECT = 'projects/LOAD_PROJECT';
const UPDATE_PROJECT = 'projects/UPDATE_PROJECT';
const DELETE_PROJECT = 'projects/DELETE_PROJECT';
const LOAD_ONE = 'projects/LOAD_ONE'

// action creators

const addProject = (project) => ({
    type: ADD_PROJECT,
    project
});


const loadProject = (project) => ({
    type: LOAD_PROJECT,
    project
});

const loadOne = (project) => ({
    type: LOAD_ONE,
    project
})

const updateProject = (project) => ({
    type: UPDATE_PROJECT,
    project
});

const deleteProject = (projectId) => ({
    type: DELETE_PROJECT,
    projectId
});



// thunk

export const createProject = (user_id, category_id, name, image, details, funding_goal, funding_raised, backers) => async (dispatch) => {
    const res = await fetch(`/api/projects/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user_id, category_id, name, image, details, funding_goal, funding_raised, backers }),
    });
    if(!res.ok) throw res
    const new_project = await res.json();
    dispatch(addProject(new_project));
    return new_project;
}

export const getProjects = () => async (dispatch) => {
    const res = await fetch(`/api/projects`)
    const allProjects = await res.json();
    dispatch(loadProject(allProjects));
}

export const getOneProject = (id) => async (dispatch) => {
    // console.log('id', id)
    const res = await fetch(`/api/projects/${id}`)

    if (res.ok) {
        const oneProject = await res.json()
        dispatch(loadOne(oneProject))
        return oneProject
    }
}


export const editProject = (user_id, category_id, name, image, details, funding_goal, id) => async (dispatch) => {
    const response = await fetch(`/api/projects/edit/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user_id, category_id, name, image, details, funding_goal}),
    });
    if(!response.ok) throw response
    const editedProject = await response.json();
    dispatch(updateProject(editedProject));
    return editedProject;
}


export const editProjectFunding = (funding_raised, id) => async (dispatch) => {
    const response = await fetch(`/api/projects/editfunds/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({funding_raised}),
    });
    if(!response.ok) throw response
    const editedProject = await response.json();
    dispatch(updateProject(editedProject));
    return editedProject;
}

export const removeProject = (id) => async (dispatch) => {
    const res = await fetch(`/api/projects/delete/${id}`, {
        method : 'DELETE',
    });
    dispatch(deleteProject(id))
    return res
}


const initialState = {

};

const ProjectReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case ADD_PROJECT:
            return {
                ...state,
                [action.project.id]: action.project
            }
        case LOAD_PROJECT:
            // console.log('projectjh', action.project)
            const all = {...state};
            action.project.Projects.forEach((oneProject) => {
                all[oneProject.id] = oneProject;
            });
            return all;
        case LOAD_ONE:
                return {
                    ...action.project
                }
        case UPDATE_PROJECT:
            return {
                ...state,
                [action.project.id]: action.project
            }
        case DELETE_PROJECT:{
           const newState = {...state}
           console.log('deleted12', newState[action.ProjectId] )
           delete newState[action.projectId];
           return newState
        }

        default:
            return state;
    }
}

export default ProjectReducer;
