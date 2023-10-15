import { configureStore } from '@reduxjs/toolkit';
import userSlicer from './slicers/user.slicer';

export const store = configureStore({
    reducer: {
        user: userSlicer
    }
});


// central state : all the components' common state 