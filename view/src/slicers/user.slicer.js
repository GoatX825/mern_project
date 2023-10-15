import { createSlice } from "@reduxjs/toolkit";

const userSlicer = createSlice({
    name: 'user',
    initialState: {
        all_users: [
            {
                name: "Wiz Khalifa",
                address: "USA",
                email: "wiz@gmail.com",
                phone: 29839283394,
            },

            {
                name: "Samir Ghising",
                address: "Lalitpur",
                email: "vten@gmail.com",
                phone: 98239283394,
            },

            {
                name: "Aashish Rana",
                address: "PokhreliMob",
                email: "laure@gmail.com",
                phone: 98639283394,
            }
        ],
        name: ""
    },
    reducers: {
        setUser: (state, actions) => {
            state.name = actions.payload.name;
        },

        getUser: (state) =>{
            return state.all_users;
        }
    }
})

export const {setUser} = userSlicer.actions;
export default userSlicer.reducer;

// slicers mean reducers









