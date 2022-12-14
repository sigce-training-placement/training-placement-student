import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useUserAuth } from '../context/auth'
import Input from '../components/Input'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../context/firebase_config'
import Button from "../components/Button";

const Academics = ({ setMessage }) => {
	const { user, userData } = useUserAuth()
	const [formState, setFormState] = useState(0)
	const initialDiplomaMarks = {
		diplomasemtotal: 1,
		diplomasem1marks: 0,
		diplomasem2marks: 0,
		diplomasem3marks: 0,
		diplomasem4marks: 0,
		diplomasem5marks: 0,
		diplomasem6marks: 0,
	}

	const initialEnginneringMarks = {

	}

	const handleChangeDiploma = (e) => {
		setDiplomaMarks({
			...diplomaMarks,
			[e.target.name]: Number(e.target.value)
		})
	}

	const [primaryEdu, setPrimaryEdu] = useState(0)
	const [secondaryEdu, setSecondaryEdu] = useState(0)
	const [primaryEduTotal, setPrimaryEduTotal] = useState(1)
	const [secondaryEduTotal, setSecondaryEduTotal] = useState(1)
	const [diplomaMarks, setDiplomaMarks] = useState(initialDiplomaMarks)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (userData) {
			setDiplomaMarks(userData)
			setPrimaryEdu(userData.primaryEdu || 0)
			setPrimaryEduTotal(userData.primaryEduTotal || 1)
			setSecondaryEdu(userData.secondaryEdu || 0)
			setSecondaryEduTotal(userData.secondaryEduTotal || 1)
		}
	}, [userData]);

	const handleSubmit1 = async () => {
		let data;
		setLoading(true)
		if (userData && userData.dse) {
			data = { ...diplomaMarks, primaryEdu, primaryEduTotal }
		} else {
			data = { primaryEdu, primaryEduTotal, secondaryEdu, secondaryEduTotal }
		}
		if (data) {
			const docRef = doc(db, "users", user.uid);
			await updateDoc(docRef, data)
				.then(() => {
					setLoading(false)
					setMessage("Data Updated!")
				})
				.catch((err) => {
					setLoading(false)
					setMessage(err.message)
				})
		}
	}
	return (
		<>
			<Layout className={"flex items-center justify-center"} title="Academics">
				<form className='relative m-auto w-11/12 bg-white rounded-xl shadow-lg px-6 py-6 form-custom-height-parent h-5/6 overflow-y-auto'>
					<h1 className='text-center font-bold text-3xl mb-5 mt-3'>Academics</h1>
					<div className='justify-center flex items-center'>
						<span onClick={() => { setFormState(0) }} className={formState === 0 ? 'duration-300 cursor-pointer mx-2 bg-indigo-600 h-[6px] w-[10rem] rounded-md' : "duration-300 cursor-pointer mx-2 bg-gray-300 h-[6px] w-[10rem] rounded-md"}></span>
						<span onClick={() => { setFormState(1) }} className={formState === 1 ? 'duration-300 cursor-pointer mx-2 bg-indigo-600 h-[6px] w-[10rem] rounded-md' : "duration-300 cursor-pointer mx-2 bg-gray-300 h-[6px] w-[10rem] rounded-md"}></span>
					</div>
					<div className={formState === 0 ? 'flex flex-col justify-between webkit-height-full left-1/2 -translate-x-1/2 w-11/12 absolute mt-12 px-5 opacity-100 duration-300 pb-4 ' : "flex flex-col justify-between webkit-height-full pb-4 left-1/2 -translate-x-1/2 w-11/12 absolute mt-12 px-5 opacity-0 duration-300 pointer-events-none"}>
						<div>
							<h1 className='text-xl font-bold mb-2 border-b w-max'>Primary Education</h1>
							<div className='grid grid-cols-3 gap-x-6 border-b-2 pb-6'>
								<Input value={primaryEdu} changeHandler={(e) => { setPrimaryEdu(Number(e.target.value)) }} id="firstMarksObtained" label="Marks Obtained in 10th" placeholder={"Enter the 10th marks obtained"} />
								<Input value={primaryEduTotal} changeHandler={(e) => { setPrimaryEduTotal(Number(e.target.value)) }} id="firstMarksTotal" label="Total Marks in 10th" placeholder={"Enter the 10th total marks"} />
								<Input value={Math.round((primaryEdu / primaryEduTotal) * 100) + "%"} readOnly={true} id="firstOutput" label="Percentage Obtained in 10th" placeholder={"Enter the 10th percentage"} />
							</div>
							<h1 className='text-xl font-bold mb-2 mt-4'>Secondary Education</h1>
							{userData && !userData.dse && <div className='grid grid-cols-3 gap-x-6'>
								<Input value={secondaryEdu} changeHandler={(e) => { setSecondaryEdu(Number(e.target.value)) }} id="secondMarksObtained" label="Marks Obtained in 12th" placeholder={"Enter the 12th marks obtained"} />
								<Input value={secondaryEduTotal} changeHandler={(e) => { setSecondaryEduTotal(Number(e.target.value)) }} id="secondMarksTotal" label="Total Marks in 12th" placeholder={"Enter the 12th total marks"} />
								<Input value={Math.round((secondaryEdu / secondaryEduTotal) * 100) + "%"} readOnly={true} id="secondOutput" label="Percentage Obtained in 12th" placeholder={"Enter the 12th percentage"} />
							</div>}
							{userData && userData.dse && <div className='grid grid-cols-3 gap-x-6 gap-y-4'>
								<Input type='number' value={diplomaMarks.diplomasem1marks} changeHandler={handleChangeDiploma} id="diplomasem1marks" label="Marks Obtained in 1st Semister" placeholder={"Enter the marks obtained in 1st Semister"} />
								<Input type='number' value={diplomaMarks.diplomasemtotal} changeHandler={handleChangeDiploma} id="diplomasemtotal" label="Total Marks" placeholder={"Enter the total marks"} />
								<Input value={((diplomaMarks.diplomasem1marks / diplomaMarks.diplomasemtotal) * 100).toFixed(2) + "%"} readOnly={true} label="Percentage in 1st Semister" />
								<Input type='number' value={diplomaMarks.diplomasem2marks} changeHandler={handleChangeDiploma} id="diplomasem2marks" label="Marks Obtained in 2nd Semister" placeholder={"Enter the marks obtained in 2nd Semister"} />
								<Input type='number' value={diplomaMarks.diplomasemtotal} changeHandler={handleChangeDiploma} id="diplomasemtotal" label="Total Marks" placeholder={"Enter the total marks"} />
								<Input value={((diplomaMarks.diplomasem2marks / diplomaMarks.diplomasemtotal) * 100).toFixed(2) + "%"} readOnly={true} label="Percentage in 2nd Semister" />
								<Input type='number' value={diplomaMarks.diplomasem3marks} changeHandler={handleChangeDiploma} id="diplomasem3marks" label="Marks Obtained in 3rd Semister" placeholder={"Enter the marks obtained in 3rd Semister"} />
								<Input type='number' value={diplomaMarks.diplomasemtotal} changeHandler={handleChangeDiploma} id="diplomasemtotal" label="Total Marks" placeholder={"Enter the total marks"} />
								<Input value={((diplomaMarks.diplomasem3marks / diplomaMarks.diplomasemtotal) * 100).toFixed(2) + "%"} readOnly={true} label="Percentage in 3rd Semister" />
								<Input type='number' value={diplomaMarks.diplomasem4marks} changeHandler={handleChangeDiploma} id="diplomasem4marks" label="Marks Obtained in 4th Semister" placeholder={"Enter the marks obtained in 4th Semister"} />
								<Input type='number' value={diplomaMarks.diplomasemtotal} changeHandler={handleChangeDiploma} id="diplomasemtotal" label="Total Marks" placeholder={"Enter the total marks"} />
								<Input value={((diplomaMarks.diplomasem4marks / diplomaMarks.diplomasemtotal) * 100).toFixed(2) + "%"} readOnly={true} label="Percentage in 4th Semister" />
								<Input type='number' value={diplomaMarks.diplomasem5marks} changeHandler={handleChangeDiploma} id="diplomasem5marks" label="Marks Obtained in 5th Semister" placeholder={"Enter the marks obtained in 5th Semister"} />
								<Input type='number' value={diplomaMarks.diplomasemtotal} changeHandler={handleChangeDiploma} id="diplomasemtotal" label="Total Marks" placeholder={"Enter the total marks"} />
								<Input value={((diplomaMarks.diplomasem5marks / diplomaMarks.diplomasemtotal) * 100).toFixed(2) + "%"} readOnly={true} label="Percentage in 5th Semister" />
								<Input type='number' value={diplomaMarks.diplomasem6marks} changeHandler={handleChangeDiploma} id="diplomasem6marks" label="Marks Obtained in 6th Semister" placeholder={"Enter the marks obtained in 6th Semister"} />
								<Input type='number' value={diplomaMarks.diplomasemtotal} changeHandler={handleChangeDiploma} id="diplomasemtotal" label="Total Marks" placeholder={"Enter the total marks"} />
								<Input value={((diplomaMarks.diplomasem6marks / diplomaMarks.diplomasemtotal) * 100).toFixed(2) + "%"} readOnly={true} label="Percentage in 6th Semister" />
							</div>}
						</div>
						<div className='flex justify-between mt-9 pb-8'>
							<Button text="Previous" disabled={true} handler={() => { setFormState(0) }} className="w-4/12 py-2 mt-3" />
							<Button text="Next" handler={() => { setFormState(1) }} className="w-4/12 py-2 mt-3" />
						</div>
					</div>
					<div className={formState === 1 ? 'left-1/2 -translate-x-1/2 w-11/12 absolute mt-12 px-5 opacity-100 duration-300' : "left-1/2 -translate-x-1/2 w-11/12 absolute mt-12 px-5 opacity-0 duration-300 pointer-events-none"}>
						<h1 className='text-xl font-bold mb-2 border-b w-max'>Engineering</h1>
						<div>

						</div>
						<div className='flex justify-center'>
							<Button text={"Submit"} loading={loading} handler={handleSubmit1} className="py-2 mt-3" />
						</div>
					</div>
				</form>
			</Layout>
		</>
	)
}

export default Academics