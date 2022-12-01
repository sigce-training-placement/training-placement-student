import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../context/auth'
import Button from './Button'

const Navbar = () => {
	const { logOut, userData, user } = useUserAuth()
	const [routes, setRoutes] = useState([])
	useEffect(() => {
		if (userData) {
			userData.role === "student" ? setRoutes(STUDENT_ROUTES) : userData.role === "company" ? setRoutes(COMPANY_ROUTES) : userData.role === "admin" ? setRoutes(ADMIN_ROUTES) : setRoutes(NO_USER_ROUTES)
		}
	}, [userData]);

	const NO_USER_ROUTES = [
		{
			label: 'Student',
			url: '/student/login'
		},
		{
			label: 'Admin',
			url: '/admin/login'
		},
		{
			label: 'Company',
			url: '/company/login'
		}
	]
	const STUDENT_ROUTES = [
		{
			label: 'Home',
			url: '/student'
		},
		{
			label: 'Update Profile',
			url: '/student/update-profile'
		},
		{
			label: 'Club',
			url: '/student/club'
		},
		{
			label: 'Training',
			url: '/student/training'
		},
		{
			label: 'Internship',
			url: '/student/internship'
		},
		{
			label: 'Achievement',
			url: '/student/achievement'
		}
	]
	const COMPANY_ROUTES = [
		{
			label: 'Update Profile c',
			url: '/student/update-profile'
		},
		{
			label: 'Club',
			url: '/admin/club'
		},
		{
			label: 'Training',
			url: '/company/training'
		},
		{
			label: 'Internship',
			url: '/company/internship'
		},
		{
			label: 'Achievement',
			url: '/company/achievement'
		}
	]
	const ADMIN_ROUTES = [
		{
			label: 'Students',
			url: '/admin/student/'
		},
		{
			label: 'Company',
			url: '/admin/company/'
		},
		{
			label: 'Training',
			url: '/company/training'
		},
		{
			label: 'Drive',
			url: '/company/drives'
		},
		{
			label: 'Achievement',
			url: '/company/achievement'
		}
	]
	return (
		<>
			<nav className={user && user.emailVerified ? 'bg-white fixed top-0 left-0 h-screen py-5 px-3 shadow-xl w-2/12 flex flex-col items-center z-0' : "hidden"}>
				{/* <img src="/assets/sigce.png" className='h-12 mr-20' alt="" /> */}
				{
					routes.map((route) => {
						return <Link key={route.url} href={route.url}><p>{route.label}</p></Link>
					})
				}
				<Button text={"Logout"} handler={logOut} />
			</nav>
		</>
	)
}

export default Navbar