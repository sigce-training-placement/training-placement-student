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
			<button onClick={handleverification}>Click</button>
			{/* </Layout> */}
		</>
	)
}

export default Verification