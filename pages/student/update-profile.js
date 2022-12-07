import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { db } from '../../context/firebase_config'
import { useUserAuth } from '../../context/auth'
import { doc, updateDoc } from 'firebase/firestore'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Layout from '../../components/Layout'
import Select from '../../components/Select'
import CustomCalendar from '../../components/CustomCalendar'

const UpdateProfile = ({ setMessage, getDate }) => {
	const { userData, user, YEAR_OPTIONS, BRANCH_OPTIONS, GENDER_OPTIONS } = useUserAuth()
	const [loading, setLoading] = useState(false)
	const [displayCalender, setDisplayCalender] = useState(false)
	const [dateofbirth, setDateofbirth] = useState(getDate("normal"));
	const router = useRouter()

	const initialState = {
		firstname: "",
		lastname: "",
		mobileno: "",
		branch: "",
		location: "",
		gender: "",
		year: ""
	}
	const [formState, setFormState] = useState(initialState);

	useEffect(() => {
		if (userData) {
			setFormState(userData)
			setDateofbirth(userData.dateofbirth)
		}
	}, [userData]);

	const handleChange = (e) => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value
		})
	}

	const updateProfile = async () => {
		if (user) {
			setLoading(true)
			const docRef = doc(db, "users", user && user.uid);
			await updateDoc(docRef, { ...formState, dateofbirth })
				.then(() => {
					setLoading(false)
					const queryString = window.location.search;
					const urlParams = new URLSearchParams(queryString);
					const redirect = urlParams.get('redirect')
					if (redirect) {
						setTimeout(() => {
							router.push('/student/club?redirect=true')
						}, 400)
					} else {
						setMessage("Profile Updated Successfully!");
					}
				})
		}
	}

	const handleDateChange = (e) => {
		const date = new Date(e)
		setDateofbirth(`${date.getFullYear()}-${date.getMonth() + 1 <= 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`}-${date.getDate() <= 9 ? `0${date.getDate()}` : `${date.getDate()}`}`)
		setDisplayCalender(false)
	}
	return (
		<>
			<Layout title={'Update Profile'} className="flex items-center">
				<form className='m-auto w-11/12 bg-white rounded-xl shadow-lg px-6 py-10'>
					<h1 className='text-center font-bold text-3xl mb-5'>Update Profile</h1>
					<div className='grid grid-cols-2 gap-x-10 gap-y-5'>
						<div className='flex items-center gap-x-5 justify-between'>
							<Input label={"First Name"} parentClass="w-1/2" placeholder={"Enter Your First Name"} id="firstname" value={formState.firstname} changeHandler={handleChange} />
							<Input label={"Last Name"} parentClass="w-1/2" placeholder={"Enter Your Last Name"} id="lastname" value={formState.lastname} changeHandler={handleChange} />
						</div>
						<Input label={"Email Address"} placeholder={"Enter Your Email Address"} readOnly={true} id="email" value={userData && userData.email} />
						<Input label={"Registration Number"} placeholder={"Enter Your Registration Number"} readOnly={true} id="regno" value={userData && userData.regno} />
						<Input label={"Mobile Number"} placeholder={"Enter Your Mobile Number"} id="mobileno" type='number' value={formState.mobileno} changeHandler={handleChange} />
						<Select label={"Gender"} placeholder={"Select Your Gender"} id="gender" value={formState.gender} changeHandler={handleChange} options={GENDER_OPTIONS} selected={"-- Select --"} />
						<div className='grid grid-cols-2 gap-x-6'>
							<Select label={"Year"} placeholder={"Select Your Year"} id="year" value={formState.year} changeHandler={handleChange} options={YEAR_OPTIONS} selected={"-- Select --"} />
							<Select label={"Branch"} placeholder={"Select Your Branch"} id="branch" value={formState.branch} changeHandler={handleChange} options={BRANCH_OPTIONS} selected={"-- Select --"} />
						</div>
						<div className={'flex flex-col '}>
							<label htmlFor={"dob"} className=' mb-1 font-semibold cursor-pointer'>{"Date Of Birth"}: </label>
							<div className='relative -top-10'><CustomCalendar showCalendar={displayCalender} onChange={handleDateChange} value={dateofbirth} /></div>
							<input onFocus={() => { setDisplayCalender(true) }} readOnly value={dateofbirth} name={"dob"} id={"dob"} className={'Montserrat read-only:cursor-pointer disabled:cursor-not-allowed focus:border-indigo-500 duration-300 border-2 rounded-lg outline-none px-4 py-3 focus:bg-indigo-50'} type={"text"} />
						</div>
						<Input label={"Location"} placeholder={"Enter Your Current Location"} id="location" type='text' value={formState.location} changeHandler={handleChange} />
					</div>
					<Button loading={loading} text="Update" className={"w-full mt-6"} handler={updateProfile} />
				</form>
			</Layout>
		</>
	)
}


export default UpdateProfile