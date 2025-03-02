import { IUser } from '@/types/type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    user: IUser | null
    isAuthenticated: boolean
}

const initialState: UserState = {
    user: null,
    isAuthenticated: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState['user']>) => {
            state.user = action.payload
            state.isAuthenticated = !!action.payload
        },
        clearUser: (state) => {
            state.user = null
            state.isAuthenticated = false
        },
    },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
