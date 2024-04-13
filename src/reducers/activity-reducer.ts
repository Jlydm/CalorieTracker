import { Activity } from "../types"

export type ActivityActions = 
    { type: 'save-activity', payload: { newActivity : Activity } } |
    { type: 'set-activeId', payload: { id : Activity['id'] } } |
    { type: 'deleted-activity', payload: { id : Activity['id'] } } 

export type ActivityState = {
    activities : Activity[],
    activeId: Activity['id']
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState  : ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const ActivityReducer = (
    state : ActivityState = initialState, 
    action: ActivityActions
) => {

    if(action.type === 'save-activity'){
        // Manela la lógica para actualizar el state
        let updateActivities : Activity[] = []

        if(state.activeId){
            updateActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        } else {
           updateActivities =  [...state.activities, action.payload.newActivity]
        }

        return {
            ...state,
            activities: updateActivities,
            activeId: ''
        }
    }

    if(action.type === 'set-activeId'){
        return {
        // Manela la lógica para editar el state
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'deleted-activity'){
        return{
            ...state,
            activities: state.activities.filter( activity => activity.id !== action.payload.id)
        }
    }

    return state
}