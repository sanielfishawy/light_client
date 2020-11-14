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

export const saveBlink = createAsyncThunk('/light/saveBlink', async blink => {
    const response = await fetch('/light/save_blink', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({blink: blink})
    })
    return response.json()
})

export const saveFrequency = createAsyncThunk('/light/saveFrequency', async frequency => {
    const response = await fetch('/light/save_frequency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({frequency: frequency})
    })
    return response.json()
})

export const saveDutyCycle = createAsyncThunk('/light/saveDutyCycle', async duty_cycle => {
    const response = await fetch('/light/save_duty_cycle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({duty_cycle: duty_cycle})
    })
    return response.json()
})

const lightSlice = createSlice({
    name: 'light',
    initialState: {
        power: false,
        blink: true,

        min_frequency: 1,
        max_frequency: 80,
        default_frequency: 40,
        frequency: 40,

        min_duty_cycle: 10,
        max_duty_cycle: 90,
        duty_cycle: 50,
    },
    reducers:{
        setPower: (state, action) => { state.power = action.payload },
        setBlink: (state, action) => { state.blink = action.payload },
        setFrequency: (state, action) => { state.frequency = action.payload },
        setDutyCycle: (state, action) => { state.duty_cycle = action.payload },
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
            console.log('Power set', action.payload)
        },
        [saveBlink.fulfilled]: (state, action) => {
            console.log('Blink set', action.payload)
        },
        [saveFrequency.fulfilled]: (state, action) => {
            console.log('Frequency set', action.payload)
        },
        [saveDutyCycle.fulfilled]: (state, action) => {
            console.log('DutyCycle set', action.payload)
        },
    }
})

export const {setPower, setBlink, setFrequency, setDutyCycle} = lightSlice.actions

export default lightSlice.reducer