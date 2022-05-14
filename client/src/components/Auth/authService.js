import axios from 'axios'

const USER_URL = `${process.env.REACT_APP_BASE_URL}/api/users/user`

//* This function will be used to get the associated data from a specific user
const getUserData = async () => {
    try {
      const userData = await axios.get(USER_URL,{
        headers: {
          //* Sinesend yung bearer token as request header from local storage
          //* Marereceive to ng authorization middleware from back end
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
       return userData.data
    } catch (error) {
        console.error(error);
    }
}

export default getUserData