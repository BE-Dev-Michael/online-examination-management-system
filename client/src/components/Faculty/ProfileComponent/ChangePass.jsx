import { useState, useEffect } from 'react'
import axios from 'axios'
import getUserData from '../../Auth/authService'

const USER_URL = `${process.env.REACT_APP_BASE_URL}/api/users`

const ChangePass = (props) => {
    // The props.use is a sample data. Change it will the real data
    const [formData, setFormData] = useState(props.user)
    const [passwordErrors, setPasswordErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const [currPass, setCurrPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [isIncorrectPass, setIsIncorrectPass] = useState(false)

    const formChangeHandler = (e) => {
        const { name, value } = e.target

        // Set the value of each password state
        if (name === "currentpassword") {
            if (isIncorrectPass) {
                setIsIncorrectPass(false)
                setPasswordErrors(passwordValidation(currPass, newPass, confirmPass))
            }
            setCurrPass(value)
        }
        if (name === "newpassword") {
            setNewPass(value)
        }
        if (name === "confirmpass") {
            setConfirmPass(value)
        }
    }

    const passwordValidation = (currPass, newPass, confirmPass) => {
        const errors = {}

        if (!currPass) {
            errors.currPass = "Current password is required!"
        } else if (isIncorrectPass) {
            errors.currPass = "Incorrect Current Password"
        }

        if (!newPass) {
            errors.newPass = "New password is required!"
        } else if (newPass.length < 6) {
            errors.newPass = "Password must be greater than 6 characters!"
        }

        if (!confirmPass) {
            errors.confirmPass = "Confirm password is required!"
        } else if (newPass !== confirmPass) {
            errors.confirmPass = "Password did not match!"
        }
        return errors
    }


    const onSubmitChangePassword = (e) => {
        e.preventDefault()
        setPasswordErrors(passwordValidation(currPass, newPass, confirmPass))
        setIsSubmit(true)
    }

    useEffect(() => {
        if (Object.keys(passwordErrors).length === 0 && isSubmit) {
            // // Yung confirm pass yung ginamit ko pang update ng pass
            // setFormData((prev) => ({ ...prev, password: confirmPass }))
            const changePassword = async () => {
                const { _id } = await getUserData()
                try {
                    const newPword = await axios.patch(USER_URL.concat(`/change-password/${_id}`), {
                        currPass: currPass,
                        newPass: newPass,
                    })
                    if (newPword.data === 1) {
                        setIsIncorrectPass(true)
                        setPasswordErrors(passwordValidation(currPass, newPass, confirmPass))
                    } else {
                        alert('Your password has been changed.')
                        window.location.reload(false)
                    }
                    
                } catch (error) {
                    console.error(error)
                    
                }
              
                // window.location.reload(false)
            }
            changePassword()
        }
    }, [passwordErrors])

    return (
        <div className="my-5 lg:w-10/12 border p-5 rounded-md shadow-md bg-white dark:bg-[#26292F] dark:border-[#26292F]">
            <form onSubmit={onSubmitChangePassword}>
                <h3 className="text-lg font-medium mb-5 ml-5 dark:text-[#e2dddd]">Change password</h3>

                <div className="flex flex-col mb-3">
                    <label className="font-semibold mb-1 ml-5 dark:text-[#e2dddd]">Current Password</label>
                    <div className="flex relative ">
                        <input
                            onChange={formChangeHandler}
                            name="currentpassword"
                            type="password"
                            className="ml-5 mr-10 rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-[#17181C] dark:border-[#17181C] dark:text-[#e2dddd]" />
                    </div>
                    <p className="text-red-600 text-sm font-normal ml-6">{passwordErrors.currPass}</p>
                </div>

                <div className="flex flex-col mb-3">
                    <label className="font-semibold mb-1 ml-5 dark:text-[#e2dddd]">New Password</label>
                    <div className="flex relative ">
                        <input
                            onChange={formChangeHandler}
                            name="newpassword"
                            type="password"
                            className="ml-5 mr-10 rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-[#17181C] dark:border-[#17181C] dark:text-[#e2dddd]" />
                    </div>
                    <p className="text-red-600 text-sm font-normal ml-6">{passwordErrors.newPass}</p>
                </div>

                <div className="flex flex-col mb-3">
                    <label className="font-semibold mb-1 ml-5 dark:text-[#e2dddd]">Confirm Password</label>
                    <div className="flex relative ">
                        <input
                            onChange={formChangeHandler}
                            name="confirmpass"
                            type="password"
                            className="ml-5 mr-10 rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent dark:bg-[#17181C] dark:border-[#17181C] dark:text-[#e2dddd]" />
                    </div>
                    <p className="text-red-600 text-sm font-normal ml-6">{passwordErrors.confirmPass}</p>
                </div>

                <div className="flex justify-center py-4">
                    <button
                        type="submit"
                        className={`w-52 py-2 px-4 bg-slate-400 hover:bg-slate-500 focus:ring-slate-500 focus:ring-offset-slate-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full`}>
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ChangePass