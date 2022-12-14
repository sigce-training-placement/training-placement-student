import React from 'react'
import { checkActionCode, applyActionCode } from "firebase/auth";
import Button from '../components/Button';
import { auth } from '../context/firebase_config';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

const Verify = () => {
	const router = useRouter()
	const handleClick = () => {
		const url = window.location.search;
		let params = new URLSearchParams(url);
		let actionCode = params.get("oobCode")
		let continueURL = "/login?redirect=true";
		applyActionCode(auth, actionCode)
			.then((response) => {
				router.push(continueURL)
			})
			.catch((error) => {
				console.log(error)
			})
	}
	return (
		<>
			<Layout>
				<Button text="Verify" handler={handleClick} />
			</Layout>
		</>
	)
}

export default Verify