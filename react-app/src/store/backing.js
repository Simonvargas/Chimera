// action verbs
const ADD_BACKING= 'backings/ADD_BACKING';
const LOAD_BACKING = 'backings/LOAD_BACKING';
const UPDATE_BACKING = 'backings/UPDATE_BACKING';
const DELETE_BACKING = 'backings/DELETE_BACKING';

// action creators

const addBacking = (backing) => ({
    type: ADD_BACKING,
    backing
});


const loadBackings = (backing) => ({
    type: LOAD_BACKING,
    backing
});


const updateBacking = (project) => ({
    type: UPDATE_BACKING,
    project
});

const deleteBacking = (backingId) => ({
    type: DELETE_BACKING,
    backingId
});



// thunk

export const createBacking= (user_id, category_id, name, image, details, funding_goal) => async (dispatch) => {
    const res = await fetch(`/api/backings/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user_id, category_id, name, image, details, funding_goal }),
    });
    if(!res.ok) throw res
    const new_project = await res.json();
    dispatch(addBacking(new_project));
    return new_project;
}

export const getbackings = () => async (dispatch) => {
    const res = await fetch(`/api/backings`)
    const allbackings = await res.json();
    dispatch(loadBackings(allbackings));
    return allbackings;
}


export const editBacking = (user_id, category_id, name, image, details, funding_goal, id) => async (dispatch) => {
    const response = await fetch(`/api/backings/edit/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user_id, category_id, name, image, details, funding_goal}),
    });
    if(!response.ok) throw response
    const editedProject = await response.json();
    dispatch(updateBacking(editedProject));
    return editedProject;
}

export const removeBacking = (id) => async (dispatch) => {
    console.log(id, "THIS IS ID")
    const res = await fetch(`/api/backings/delete/${id}`, {
        method : 'DELETE',
    });

    dispatch(deleteBacking(res))
    return 
}

// reducer.

const initialState = {

};

const BackingReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case ADD_BACKING:
            return {
                ...state,
                [action.project.id]: action.project
            }
        case LOAD_BACKING:
            const all = {...state};
            action.backing.Backings.forEach((oneBacking) => {
                all[oneBacking.id] = oneBacking;
            });
            return all;
        case UPDATE_BACKING:
            return {
                ...state,
                [action.project.id]: action.project
            }
        case DELETE_BACKING:{
           const newState = {...state}
           return newState
        }

        default:
            return state;
    }
}

export default BackingReducer;
