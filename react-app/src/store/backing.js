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


const updateBacking = (backing) => ({
    type: UPDATE_BACKING,
    backing
});

const deleteBacking = (backingId) => ({
    type: DELETE_BACKING,
    backingId
});


// thunk

export const createBacking = (user_id, project_id, amount, comment) => async (dispatch) => {
    const res = await fetch(`/api/backings/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({project_id, user_id, amount, comment }),
    });
    if(!res.ok) throw res
    const new_backing = await res.json();
    dispatch(addBacking(new_backing));
    return new_backing;
}

export const getbackings = () => async (dispatch) => {
    const res = await fetch(`/api/auth/backings`)
    const allbackings = await res.json();
    dispatch(loadBackings(allbackings));
    return allbackings;
  }


export const editBacking = (comment, id) => async (dispatch) => {
    const response = await fetch(`/api/backings/edit/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({comment}),
    });
    if(!response.ok) throw response
    const editedBacking = await response.json();
    dispatch(updateBacking(editedBacking));
    return editedBacking
}

export const removeBacking = (id) => async (dispatch) => {
    // console.log(id, "THIS IS ID")
    const res = await fetch(`/api/backings/delete/${id}`, {
        method : 'DELETE',
    });
    // if (!res.ok) throw res
    dispatch(deleteBacking(id))
    return res
}

// reducer.

const initialState = {

};

const BackingReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case ADD_BACKING:
            return {
                ...state,
                [action.backing.id]: action.backing
            }
        case LOAD_BACKING:
            const all = {...state};
            console.log('action', action.backing.users)
            action.backing.Backings.forEach((oneBacking) => {
                all[oneBacking.id] = oneBacking;
                
            });
            return all;
        case UPDATE_BACKING:
            return {
                ...state,
                [action.backing.id]: action.backing
            }
        case DELETE_BACKING:{
        //    let newState = {...state}
        //    newState = Object.values(newState).filter(back => back.id !== action.backingId)
        //    return {...newState}
        // }
            const newState = {...state}
            console.log('here', newState[action.backingId])
            delete newState[action.backingId];
            return newState
         }

        default:
            return state;
    }
}

export default BackingReducer;
