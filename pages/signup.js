import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { auth, db } from '../context/firebase_config'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore'
import Input from '../components/Input'
import Layout from '../components/Layout'
import Button from '../components/Button'
import Link from 'next/link';

const StudentSignup = ({ setMessage }) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmpassword, setConfirmPassword] = useState("")
	const [loading, setLoading] = useState(false);
	const router = useRouter()

	const handleClick = () => {
		if (email.includes('@sigce.edu.in')) {
			setLoading(true)
			createUserWithEmailAndPassword(auth, email, password)
				.then(async (userCredential) => {
					const user = userCredential.user;
					setLoading(false)
					setMessage('Account Created Successfully!')
					await setDoc(doc(db, "users", user.uid), {
						email: user.email,
						regno: user.email.split('@')[0],
						uid: user.uid,
						role: 'student'
					})
						.then(() => {
							setMessage('')
							sendEmailVerification(auth.currentUser)
							.then(() => {
									setMessage('Verification Email sent! Do check your spam section')
									router.push('/student/update-profile?redirect=true')
								});
						})
				})
				.catch((error) => {
					setMessage(error.message)
					setLoading(false)
				});
		} else {
			setMessage("Only organization emails can access the portal!")
		}
	}
	return (
		<>
			<Layout title={'Student Sign Up'} className={'flex items-center'}>
				<div className='w-7/12 bg-white rounded-xl px-10 py-5 m-auto shadow-lg'>
					<h1 className='text-center font-bold text-3xl mb-5'>Create Account</h1>
					<div>
						<Input type={'email'} label={'Email: '} value={email} changeHandler={(e) => { setEmail(e.target.value) }} placeholder={'Enter Your Email Address'} id={'email'} />
						<Input type="password" label={'Password: '} value={password} changeHandler={(e) => { setPassword(e.target.value) }} placeholder={'Enter Your Password'} id={'password'} className={'mt-3'} />
						<Input type="password" label={'Confirm Password: '} value={confirmpassword} changeHandler={(e) => { setConfirmPassword(e.target.value) }} placeholder={'Enter Your Confirm Password'} id={'confirmPassword'} className={'mt-3'} />
						<Button loading={loading} handler={handleClick} className={'mt-5 m-auto w-full'} text="Create Account" />
						<p className='mt-3 text-md font-semibold text-center'>Already have an account? <Link className='text-blue-400' href="/login">Sign In</Link></p>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default StudentSignup