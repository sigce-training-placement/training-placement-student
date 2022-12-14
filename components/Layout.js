import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../context/auth';
import Navbar from './Navbar';
import PageHead from './PageHead';

const Layout = ({ children, className, title, setMessage, navbar }) => {
	const { userData, logOut, user } = useUserAuth()
	const router = useRouter()

	// useEffect(() => {
	// 	if (user && !user.emailVerified) {
	// 		router.push("/verification")
	// 	} else {
	// 		console.log(router.pathname)
	// 	}
	// }, [user]);


	// useEffect(() => {
	// 	if (userData && !userData.firstname) {
	// 		router.push("/update-profile?redirect=true")
	// 	} else {
	// 		return 
	// 	}
	// }, [userData]);
	const [change, setChange] = useState(false)
	useEffect(() => {
		setChange(true)
		setTimeout(() => {
			setChange(false)
		}, 1000);
	}, [router.pathname]);
	return (
		<>
			{/* <div className={change ? 'h-screen w-screen bg-white z-[10000] fixed top-0 left-0 duration-100 opacity-100' : ' h-screen bg-white z-[10000] fixed top-0 left-0 duration-500 opacity-0 pointer-events-none w-screen'}></div> */}
			<PageHead title={title} />
			{navbar && <Navbar />}
			<div className={!navbar ? `bg-opacity-50 z-10 bg-color backdrop-blur-lg h-screen w-full ${className}` : `backdrop-blur-lg bg-opacity-50 z-10 bg-color h-screen w-custom absolute top-0 left-[17vw] ${className}`}>
				{children}
			</div>
		</>
	)
}

export default Layout