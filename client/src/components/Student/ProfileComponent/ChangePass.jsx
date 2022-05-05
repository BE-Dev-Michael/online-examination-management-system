import { useState, useEffect } from 'react'

const ChangePass = (props) => {
    // The props.use is a sample data. Change it will the real data
    const [formData, setFormData] = useState(props.user)
    const [passwordErrors, setPasswordErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const [currPass, setCurrPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const formChangeHandler = (e) => {
        const { name, value } = e.target

        // Set the value of each password state
        if (name === "currentpassword") {
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
        } else if (currPass !== formData.password) {
            errors.currPass = "Incorrect Password"
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
            // Yung confirm pass yung ginamit ko pang update ng pass
            setFormData((prev) => ({ ...prev, password: confirmPass }))
        }
    }, [passwordErrors])

    return (
        <div className="my-5 lg:w-10/12 border p-5 rounded-sm shadow">
            <form onSubmit={onSubmitChangePassword}>
                <h3 className="text-lg font-medium mb-5">Change password</h3>

                <div className="flex flex-col mb-3">
                    <label className="font-semibold mb-1 ml-5">Current Password</label>
                    <div className="flex relative ">
                        <input
                            onChange={formChangeHandler}
                            name="currentpassword"
                            type="password"
                            className="ml-5 mr-10 rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent" />
                    </div>
                    <p className="text-red-600 text-sm font-normal ml-6">{passwordErrors.currPass}</p>
                </div>

                <div className="flex flex-col mb-3">
                    <label className="font-semibold mb-1 ml-5">New Password</label>
                    <div className="flex relative ">
                        <input
                            onChange={formChangeHandler}
                            name="newpassword"
                            type="password"
                            className="ml-5 mr-10 rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent" />
                    </div>
                    <p className="text-red-600 text-sm font-normal ml-6">{passwordErrors.newPass}</p>
                </div>

                <div className="flex flex-col mb-7">
                    <label className="font-semibold mb-1 ml-5">Confirm Password</label>
                    <div className="flex relative ">
                        <input
                            onChange={formChangeHandler}
                            name="confirmpass"
                            type="password"
                            className="ml-5 mr-10 rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent" />
                    </div>
                    <p className="text-red-600 text-sm font-normal ml-6">{passwordErrors.confirmPass}</p>
                </div>

                <div className="flex justify-center pb-4">
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