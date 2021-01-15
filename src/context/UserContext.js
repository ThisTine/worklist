import {createContext} from 'react'

const UserContext = createContext(
{    userdata: {
    udata: null,
    loading: true,
    cdata: []
}
})

export default UserContext