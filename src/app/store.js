import { configureStore } from '@reduxjs/toolkit';
import lightReducer, {fetchLightState} from '../features/light/lightSlice'

export const store = configureStore({
  reducer: {
    light: lightReducer,
  },
});

setInterval(
  async () => {await store.dispatch(fetchLightState())},
  500,
)
// (async () => {await store.dispatch(fetchLightState())})()
