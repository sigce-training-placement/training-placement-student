import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { db, storage } from '../context/firebase_config'
import { useUserAuth } from '../context/auth'
import { addDoc, doc, updateDoc, collection, query, where, onSnapshot } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FiUpload } from 'react-icons/fi'
import Button from '../components/Button'
import Select from '../components/Select'
import Input from '../components/Input'
import Layout from '../components/Layout'
import ClubCard from '../components/ClubCard'
import { useUserData } from '../context/data'

export default function StudentClub({ setMessage, yearArray }) {
	const { user } = useUserAuth()
	const [loading, setLoading] = useState(false)
	const [redirect, setRedirect] = useState(false)
	const [progress, setProgress] = useState(0)
	const [certificateURL, setCertificateURL] = useState("")
	const [file, setFile] = useState()
	const router = useRouter()
	const { clubs } = useUserData()

	const initialState = {
		name: "",
		fromyear: "",
		toyear: "",
	}
	const [formState, setFormState] = useState(initialState);

	useEffect(() => {
		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const redirectParam = urlParams.get('redirect')
		if (redirectParam) {
			setRedirect(true)
		} else {
			setRedirect(false)
		}
	}, []);

	const handleSubmit = async () => {
		if (user) {
			setLoading(true)
			const docRef = await addDoc(collection(db, "student-club"), { ...formState, certificate: certificateURL, uid: user.uid })
				.then(() => {
					setCertificateURL("")
					setFormState(initialState)
					setLoading(false)
					setProgress(0)
				})
		}
	}

	const handleChange = (e) => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value
		})
	}
	const handleFileUpload = (e) => {
		if (formState.name.length != 0) {
			const storageRef = ref(storage, `clubs/${formState.name.trim()}`);
			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on('state_changed',
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log(progress)
					setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
					switch (snapshot.state) {
						case 'paused':
							console.log('Upload is paused');
							break;
						case 'running':
							console.log('Upload is running');
							break;
					}
				},
				(error) => {
					setMessage(error.message)
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						setCertificateURL(downloadURL)
						setFile()
					});
				}
			);
		} else {
			setMessage("Enter name of the club first!");
		}
	}


	return (
		<>
			<Layout title={'Club Details'} className="flex items-center" navbar={true}>
				<form className='m-auto w-11/12 bg-white rounded-xl shadow-lg px-6 py-6 form-custom-height-parent h-5/6 overflow-hidden'>
					<h1 className='text-center font-bold text-3xl mb-5'>Clubs</h1>
					<div className='grid grid-cols-2 gap-x-6 form-custom-height overflow-hidden'>
						<div className='grid grid-cols-1 gap-y-5'>
							<Input label={"Club Name"} placeholder={"Enter name of the club"} id="name" value={formState.name} changeHandler={handleChange} />
							<Select label={"From Year"} placeholder={"Enter joining year"} id="fromyear" options={yearArray("prev")} changeHandler={handleChange} value={formState.fromyear} selected="-- Select --" />
							<Select label={"To Year"} placeholder={"Enter To year"} id="toyear" options={yearArray("next")} changeHandler={handleChange} value={formState.toyear} selected="-- Select --" />
							<div className='grid grid-cols-6 gap-x-5'>
								<Input parentClass="col-span-5" label={"Club Certificate"} placeholder={"Upload Certificate"} id="certificate" type='file' accept="application/pdf,application/vnd.ms-excel" changeHandler={(e) => { setFile(e.target.files[0]) }} />
								<Button loading={loading} text={<FiUpload />} className={"mt-6 col-span-1"} handler={handleFileUpload} />
							</div>
							<span className='relative w-full h-3 bg-gray-200 rounded-lg'>
								<span className='bg-green-600 duration-300 w-0 h-full absolute top-0 left-0 rounded-lg' style={{ width: `${progress}%` }}></span>
							</span>
						</div>
						<div className='flex flex-col gap-y-6 py-1 overflow-y-scroll'>
							{
								clubs.length == 0 ? <h1 className='mt-5 text-xl font-bold text-center'>No results found!</h1> : clubs.map((club, index) => {
									return <ClubCard data={club} key={club.name + index} index={index} />
								})
							}
						</div>
					</div>
					<div className={redirect ? 'grid grid-cols-2 gap-x-6' : 'grid grid-cols-1 gap-x-6'}>
						<Button disabled={progress != 100 || progress == 0} loading={loading} text={"Add"} className={"w-full mt-6"} handler={handleSubmit} />
						{redirect && <Button loading={loading} text={"Next"} className={"w-full mt-6"} handler={() => { router.push('/training?redirect=true') }} />}
					</div>
					{redirect && <p className='mt-3 text-center'><b className='cursor-pointer' onClick={() => { router.push('/training?redirect=true') }}>Click here</b> if you are not core team member of any club</p>}
				</form>
			</Layout>
		</>
	)
}
