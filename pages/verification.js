import { sendEmailVerification } from 'firebase/auth';
import React from 'react'
import Layout from '../components/Layout'
import { useUserAuth } from '../context/auth';
import { auth } from '../context/firebase_config';

const Verification = () => {
	const { logOut } = useUserAuth()
	const handleverification = () => {
		sendEmailVerification(auth.currentUser)
			.then(() => {
				console.log("done")
				logOut("/login?update=true")
			});
	}
	return (
		<>
			{/* <Layout title={"Verification"}> */}
			<div className='custom-bg-color-no-auth h-screen w-screen flex justify-center items-center'>
				<button onClick={handleverification}>Click</button>
			</div>
			{/* </Layout> */}
		</>
	)
}

export default Verification