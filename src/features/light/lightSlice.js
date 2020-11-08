import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const fetchLightState = createAsyncThunk('/light/fetchLightState', async () => {
    const response = await fetch('/light')
    return response.json()
})

export const savePower = createAsyncThunk('/light/savePower', async power => {
    const response = await fetch('/light/save_power', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({power: power})
          })
          return response.json()
    })

const lightSlice = createSlice({
    name: 'light',
    initialState: {
        power: false
    },
    reducers:{
        setPower: (state, action) => { state.power = action.payload },
    },
    extraReducers:{
        [fetchLightState.fulfilled]: (state, action) => {
            const fetchedState = action.payload
            for (let key of Object.keys(fetchedState)){state[key] = fetchedState[key]}
        },
        [fetchLightState.rejected]: (state, action) => {
            console.log('Rejected!')
            console.error(action.error)
        },
        [savePower.fulfilled]: (state, action) => {
            console.log('Power set', action.payload )
        },
    }
})

export const {setPower} = lightSlice.actions

export default lightSlice.reducer