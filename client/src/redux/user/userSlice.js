import {createSlice} from "@reduxjs/toolkit"

// loads user data from localStorage
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('currentUser')
        return serializedState ? JSON.parse(serializedState) : null
    } catch (err) {
        console.error("Error loading state:", err)
        return null
    }
}

const persistedUser = loadState()

// initial app state
const initialState = {
    currentUser: persistedUser,
    error: null,
    loading: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        // start sign in
        signInStart: (state) => {
            state.loading = true
            state.error = null
        },

        // sign in success
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
            localStorage.setItem('currentUser', JSON.stringify(action.payload))
        },

        // sign in failed
        signInFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
            localStorage.removeItem('currentUser')
        },

        // start update
        updateUserStart: (state) => {
            state.loading = true
        },

        // update success
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.error = null
            localStorage.setItem('currentUser', JSON.stringify(action.payload))
        },

        // update failed
        updateUserFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },

        // start delete user
        deleteUserStart: (state) => {
            state.loading = true
        },

        // delete success
        deleteUserSuccess: (state) => {
            state.currentUser = null
            state.loading = false
            state.error = false
            localStorage.removeItem('currentUser')
        },

        // delete failed
        deleteUserFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },

        // start sign out
        signOutUserStart: (state) => {
            state.loading = true
        },

        // sign out success
        signOutUserSuccess: (state) => {
            state.currentUser = null
            state.loading = false
            state.error = false
            localStorage.removeItem('currentUser')
        },

        // sign out failed
        signOutUserFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    }
})

//  EXPORT ALL ACTIONS (including the new signOutUser)
export const {signInStart, signInSuccess, signInFailure, signOutUser,

 //  EXPORT ALL ACTIONS (UpdateUser)    
 updateUserStart, updateUserSuccess, updateUserFailure,

//  EXPORT ALL ACTIONS (deleteUser)    
 deleteUserStart, deleteUserSuccess, deleteUserFailure,

 signOutUserStart,  signOutUserSuccess,  signOutUserFailure
 } = userSlice.actions

// to get this into store 
export default userSlice.reducer