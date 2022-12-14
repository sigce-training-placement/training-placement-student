import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../context/auth'
import { useUserData } from '../context/data'
import Button from './Button'
import { useRouter } from 'next/router'
import { HiOutlineViewGridAdd, HiOutlineClipboardCheck } from 'react-icons/hi'
import { BiUserVoice, BiBuildings } from 'react-icons/bi'
import { MdOutlineContactPage } from 'react-icons/md'
import { IoHelpOutline } from 'react-icons/io5'

const Navbar = () => {
	const dashboard = <HiOutlineViewGridAdd />
	const placement = <BiUserVoice />
	const training = <HiOutlineClipboardCheck />
	const profile = <MdOutlineContactPage />
	const company = <BiBuildings />
	const Help = <IoHelpOutline />
	const { logOut, userData, user } = useUserAuth()
	const [routes, setRoutes] = useState([])
	const router = useRouter()
	const STUDENT_ROUTES = [
		{
			label: 'Dashboard',
			url: '/dashboard',
			icon: dashboard
		},
		{
			label: 'Drive',
			url: '/drive',
			icon: placement
		},
		{
			label: 'Training',
			url: '/training',
			icon: training
		},
		{
			label: 'Profile',
			url: '/profile',
			icon: profile
		},
		{
			label: 'Help',
			url: '/help',
			icon: Help
		},
	]
	return (
		<>
			{<div className='absolute bottom-10 h-64 w-64 left-10 rounded-full bg-indigo-400 blur-3xl opacity-70'></div>}
			{userData && !userData.restrict && <nav className={user && user.emailVerified ? 'pb-10 fixed top-0 left-0 h-screen py-5 w-[17vw] flex flex-col items-center justify-between z-0 border-r overflow-hidden backdrop-blur-3xl' : "hidden"} >
				<div className='w-full'>
					<h1 className='text-center text-lg font-semibold mb-10'>Training & Placement</h1>
					{
						STUDENT_ROUTES.map((route) => {
							if (route.url === router.asPath || router.pathname.includes(route.url)) {
								return <Link className='text-left border-l-4 border-indigo-600 py-3 duration-200 w-full text-indigo-600 font-semibold flex items-center hover:bg-indigo-100' key={route.url} href={route.url}><div className='h-8 w-16 flex justify-center items-center'>{route.icon}</div><p>{route.label}</p></Link>
							} else {
								return <Link className='border-l-4 border-transparent hover:border-indigo-400 w-full text-left py-3 duration-200  text-gray-600 font-semibold flex items-center hover:bg-indigo-100' key={route.url} href={route.url}><div className='h-8 w-16 flex justify-center items-center'>{route.icon}</div><p>{route.label}</p></Link>
							}
						})
					}
				</div>

				<div className='w-full flex flex-col mb-10'>
					<div className='flex items-center px-6 gap-x-3 justify-center'>
						<img src="/assets/sigce.png" className='h-12 w-12 rounded-full bg-white border' alt="" />
						<span className='text-gray-600 font-semibold whitespace-nowrap overflow-hidden text-ellipsis'>{userData && userData.firstname} {userData && userData.lastname}</span>
					</div>
					<button onClick={logOut} className='font-semibold w-max m-auto mt-5 bg-white rounded-lg px-4 py-2 text-indigo-500'>Logout</button>
				</div>
			</nav>}
		</>
	)
}

export default Navbar