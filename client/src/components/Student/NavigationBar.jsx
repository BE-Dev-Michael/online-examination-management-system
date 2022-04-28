import { useState } from 'react'
import { BsFillBellFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from '../../assets/images/logo-c.png'

const NavigationBar = () => {
    const [showSearch, setShowSearch] = useState(false)

    return (
        <nav className="sticky mx-5 my-3 bg-white shadow-sm rounded-2xl border">
            <section className="px-2.5 py-1.5 bg-gray-80">
                <main className="flex items-center justify-between">
                    {/* Logo and title block */}
                    <section className="flex items-center space-x-8">
                        <a href="#">
                            <div className="flex items-center space-x-2">
                                <img src={logo} alt="logo" className="min-w-[50px] object-cover" />
                                <h2 className="text-sm lg:text-1g font-bold text-slate-900 capitalize tracking-wider"></h2>
                            </div>
                        </a>
                    </section >
                    <section className="flex items-center space-x-5">
                        <div>
                            <ul className="flex items-center space-x-4">
                                {/* Nav search box */}
                                <li className="sm:block hidden">

                                    <div hidden className="sm:block">
                                        <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                                            <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                                                <svg xmlns="http://ww50w3.org/2000/svg" className="w-4 fill-current" viewBox="0 0 35.997 36.004">
                                                    <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                                                </svg>
                                            </span>
                                            <input type="search" placeholder="Search here" className="w-72 pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition" />
                                        </div>
                                    </div>
                                </li>

                                {/* User picture     */}
                                <li className="sm:hidden block">
                                    <img src="https://avatarfiles.alphacoders.com/275/275525.jpg" alt="user" className="w-8 object-cover rounded-full" />
                                </li>

                                {/* Notification */}
                                <li>

                                    <button className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                                        <BsFillBellFill className="h-5 w-5 m-auto text-gray-600 hover:text-blue-400" />
                                    </button>
                                </li>

                                {/* Search button hidden */}
                                <li className="sm:hidden block">

                                    <button onClick={() => setShowSearch(!showSearch)} className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden">
                                        <GiHamburgerMenu className="w-5 h-5 m-auto text-gray-500 hover:text-blue-400" />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </section>
                </main >
            </section >

            {/* Search box for mobile */}
            <section className={(showSearch ? 'block' : '') + "hidden p-2 rounded-b-2xl border-t-2 border-slate-300"}>
                <section className="w-full">
                    <ul>
                        <li>
                            <button className="flex px-2 py-1 w-full font-medium text-base text-slate-700 rounded hover:bg-[#6e8eac] hover:text-white">Dashboard</button>
                        </li>
                        <li>
                            <button className="flex px-2 py-1 my-1 w-full font-medium text-base text-slate-700 rounded hover:bg-[#6e8eac] hover:text-white">Exams</button>
                        </li>
                        <li>
                            <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                                <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                                    <svg xmlns="http://ww50w3.org/2000/svg" className="w-4 fill-current" viewBox="0 0 35.997 36.004">
                                        <path d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                                    </svg>
                                </span>
                                <input type="search" placeholder="Search here" className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition" />
                            </div>
                        </li>
                    </ul>
                </section>
            </section>
        </nav >
    )
}

export default NavigationBar