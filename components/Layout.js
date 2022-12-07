import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useUserAuth } from '../context/auth';
import PageHead from './PageHead';

const Layout = ({ children, className, title, setMessage }) => {
	const { userData, logOut, user } = useUserAuth()
	const router = useRouter()

	useEffect(() => {
		if (user && !user.emailVerified) {
			router.push("/verification")
		} else {
			console.log(router.pathname)
		}
	}, [user]);

	
	useEffect(() => {
		if (userData && !userData.firstname) {
			router.push("/student/update-profile?redirect=true")
		} else {
			return 
		}
	}, [userData]);


	return (
		<>
			<PageHead title={title} />
			<div className={user && user.emailVerified ? `bg-color h-screen w-10/12 absolute top-0 position-right ${className}` : "bg-color h-screen w-screen flex items-center justify-center"}>
				{children}
			</div>
		</>
	)
}

export default Layout