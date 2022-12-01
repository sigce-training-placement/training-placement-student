import { sendEmailVerification } from 'firebase/auth';
import React from 'react'
import Layout from '../components/Layout'
import { auth } from '../context/firebase_config';

const Verification = () => {
	const handleverification = () => {
		sendEmailVerification(auth.currentUser)
			.then(() => {
				console.log("done")
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