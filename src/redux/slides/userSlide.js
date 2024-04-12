import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    username: '',
    email: '',
    address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
            lat: '',
            lng: ''
        }

    },
    phone: '',
    website: '',
    company: {
        name: '',
        catchPhrase: '',
        bs: ''
      }
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser: (state) => {
            state.id = '';
            state.name = '';
            state.username = '';
            state.email = '';
            state.address.street = '';
            state.address.suite = '';
            state.address.city = '';
            state.address.zipcode = '';
            state.address.geo.lat = '';
            state.address.geo.lng = '';
            state.phone = '';
            state.website = '';
            state.company.name = '';
            state.company.catchPhrase = '';
            state.company.bs = '';
        },
    },
})

// Action creators are generated for each case reducer function
export const { resetUser } = userSlide.actions;
export default userSlide.reducer