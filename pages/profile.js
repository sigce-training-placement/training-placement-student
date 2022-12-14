import React from 'react'
import Input from '../components/Input'
import Select from '../components/Select'
import Layout from '../components/Layout'
import { useUserAuth } from '../context/auth'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useUserData } from '../context/data'
import Button from '../components/Button'
import Link from 'next/link'

const Profile = () => {
	const { userData } = useUserAuth()
	const { clubs, internships, achievements, trainings } = useUserData()
	return (
		<>
			<Layout title="Profile" className={"flex items-center"} navbar={true}>
				<form className='m-auto w-11/12 bg-white rounded-xl shadow-lg px-6 py-10 h-[90vh] overflow-y-auto'>
					<div className='flex justify-between'>
						<div></div>
						<h1 className='text-center font-bold text-3xl'>Profile</h1>
						<Link href={"/update-profile?redirect=true"}><Button text="Edit" className={"py-1"} /></Link>
					</div>
					<div className='grid grid-cols-2 gap-x-10 gap-y-5 mt-10'>
						<div className='flex items-center gap-x-5 justify-between'>
							<Input value={userData && userData.firstname} readOnly={true} label={"First Name"} parentClass="w-1/2" id="firstname" />
							<Input value={userData && userData.lastname} readOnly={true} label={"Last Name"} parentClass="w-1/2" id="lastname" />
						</div>
						<Input value={userData && userData.email} readOnly={true} label={"Email Address"} id="email" />
						<Input value={userData && userData.regno} readOnly={true} label={"Registration Number"} id="regno" />
						<Input value={userData && userData.mobileno} readOnly={true} label={"Mobile Number"} id="mobileno" type='number' />
						<Input value={userData && userData?.gender?.toUpperCase()} readOnly={true} label={"Gender"} id="gender" />
						<div className='grid grid-cols-2 gap-x-6'>
							<Input value={userData && userData.year === 1 ? "First Year" : userData && userData.year === 2 ? "Second Year" : userData && userData.year === 3 ? "Third Year" : "Fourth Year"} readOnly={true} label={"Year"} id="year" selected={"-- Select --"} />
							<Input value={userData && userData?.branch?.toUpperCase()} readOnly={true} label={"Branch"} id="branch" selected={"-- Select --"} />
						</div>
						<div className={'flex flex-col '}>
							<label htmlFor={"dob"} className=' mb-1 font-semibold cursor-pointer'>{"Date Of Birth"}: </label>
							<input value={userData && userData.dateofbirth} readOnly name={"dob"} id={"dob"} className={'Montserrat read-only:cursor-pointer disabled:cursor-not-allowed focus:border-indigo-500 duration-300 border-2 rounded-lg outline-none px-4 py-3 focus:bg-indigo-50'} type={"text"} />
						</div>
						<Input value={userData && userData.location} readOnly={true} label={"Location"} id="location" type='text' />
					</div>
					<div>
						<h1 className='text-center font-bold text-3xl mb-5 mt-10'>Academics</h1>
						<div>
							<h1 className='text-xl font-bold mb-2 border-b w-max'>Primary Education</h1>
							<div className='grid grid-cols-3 gap-x-6 border-b-2 pb-6'>
								<Input readOnly={true} value={userData && userData.primaryEdu} id="firstMarksObtained" label="Marks Obtained in 10th" />
								<Input readOnly={true} value={userData && userData.primaryEduTotal} id="firstMarksTotal" label="Total Marks in 10th" />
								<Input readOnly={true} value={userData && userData.primaryEdu ? ((userData.primaryEdu / userData.primaryEduTotal) * 100).toFixed(2) + "%" : "0%"} id="firstOutput" label="Percentage Obtained in 10th" />
							</div>
							<h1 className='text-xl font-bold mb-2 mt-4'>Secondary Education</h1>
							{userData && !userData.dse && <div className='grid grid-cols-3 gap-x-6'>
								<Input readOnly={true} value={userData && userData.secondaryEdu} id="secondMarksObtained" label="Marks Obtained in 12th" />
								<Input readOnly={true} value={userData && userData.secondaryEduTotal} id="secondMarksTotal" label="Total Marks in 12th" />
								<Input value={userData && userData.secondaryEdu ? ((userData.secondaryEdu / userData.secondaryEduTotal) * 100).toFixed(2) + "%" : "0%"} readOnly={true} id="secondOutput" label="Percentage Obtained in 12th" />
							</div>}
							{userData && userData.dse && <div className='grid grid-cols-3 gap-x-6 gap-y-4'>
								<Input readOnly={true} type='number' value={userData && userData.diplomasem1marks} id="diplomasem1marks" label="Marks Obtained in 1st Semister" />
								<Input readOnly={true} type='number' value={userData && userData.diplomasemtotal} id="diplomasemtotal" label="Total Marks" />
								<Input readOnly={true} value={userData && userData.diplomasemtotal ? ((userData.diplomasem1marks / userData.diplomasemtotal) * 100).toFixed(2) + "%" : "0%"} label="Percentage in 1st Semister" />
								<Input readOnly={true} type='number' value={userData && userData.diplomasem2marks} id="diplomasem2marks" label="Marks Obtained in 2nd Semister" />
								<Input readOnly={true} type='number' value={userData && userData.diplomasemtotal} id="diplomasemtotal" label="Total Marks" />
								<Input readOnly={true} value={userData && userData.diplomasemtotal ? ((userData.diplomasem2marks / userData.diplomasemtotal) * 100).toFixed(2) + "%" : "0%"} label="Percentage in 2nd Semister" />
								<Input readOnly={true} type='number' value={userData && userData.diplomasem3marks} id="diplomasem3marks" label="Marks Obtained in 3rd Semister" />
								<Input readOnly={true} type='number' value={userData && userData.diplomasemtotal} id="diplomasemtotal" label="Total Marks" />
								<Input readOnly={true} value={userData && userData.diplomasemtotal ? ((userData.diplomasem3marks / userData.diplomasemtotal) * 100).toFixed(2) + "%" : "0%"} label="Percentage in 3rd Semister" />
								<Input readOnly={true} type='number' value={userData && userData.diplomasem4marks} id="diplomasem4marks" label="Marks Obtained in 4th Semister" />
								<Input readOnly={true} type='number' value={userData && userData.diplomasemtotal} id="diplomasemtotal" label="Total Marks" />
								<Input readOnly={true} value={userData && userData.diplomasemtotal ? ((userData.diplomasem4marks / userData.diplomasemtotal) * 100).toFixed(2) + "%" : "0%"} label="Percentage in 4th Semister" />
								<Input readOnly={true} type='number' value={userData && userData.diplomasem5marks} id="diplomasem5marks" label="Marks Obtained in 5th Semister" />
								<Input readOnly={true} type='number' value={userData && userData.diplomasemtotal} id="diplomasemtotal" label="Total Marks" />
								<Input readOnly={true} value={userData && userData.diplomasemtotal ? ((userData.diplomasem5marks / userData.diplomasemtotal) * 100).toFixed(2) + "%" : "0%"} label="Percentage in 5th Semister" />
								<Input readOnly={true} type='number' value={userData && userData.diplomasem6marks} id="diplomasem6marks" label="Marks Obtained in 6th Semister" />
								<Input readOnly={true} type='number' value={userData && userData.diplomasemtotal} id="diplomasemtotal" label="Total Marks" />
								<Input readOnly={true} value={userData && userData.diplomasemtotal ? ((userData.diplomasem6marks / userData.diplomasemtotal) * 100).toFixed(2) + "%" : "0%"} label="Percentage in 6th Semister" />
							</div>}
						</div>
					</div>

					<div className={clubs.length !== 0 ? 'pb-6 select-none' : "hidden"}>
						<h1 className='text-center font-bold text-3xl mb-5 mt-10'>Club</h1>
						<Swiper
							spaceBetween={50}
							slidesPerView={3}
						>
							{
								clubs && clubs.map((club, index) => {
									return <SwiperSlide>
										<div className='text-center p-3 shadow-lg rounded-lg border'>
											<div>
												<h1 className='font-bold text-xl'>{index + 1}. {club.name}</h1>
												<p>From: {club.fromyear} To: {club.toyear}</p>
											</div>
										</div>
									</SwiperSlide>
								})
							}
						</Swiper>
					</div>

					<div className={internships.length !== 0 ? 'pb-6 select-none' : "hidden"}>
						<h1 className='text-center font-bold text-3xl mb-5 mt-10'>Internship</h1>
						<Swiper
							spaceBetween={50}
							slidesPerView={2}
						>
							{
								internships && internships.map((internship, index) => {
									return <SwiperSlide>
										<div className='text-center py-3 px-4 shadow-lg rounded-lg border'>
											<div>
												<h1 className='font-bold text-xl'>{index + 1}. {internship.name}</h1>
												<h1 className='font-semibold text-gray-600'>Company: {internship.company}</h1>
												<p>From: {internship.fromyear} To: {internship.toyear}</p>
											</div>
										</div>
									</SwiperSlide>
								})
							}
						</Swiper>
					</div>
					<div className={trainings.length !== 0 ? 'pb-6 select-none' : "hidden"}>
						<h1 className='text-center font-bold text-3xl mb-5 mt-10'>Training</h1>
						<Swiper
							spaceBetween={50}
							slidesPerView={2}
						>
							{
								trainings && trainings.map((training, index) => {
									return <SwiperSlide>
										<div className='text-center py-3 px-4 shadow-lg rounded-lg border'>
											<div>
												<h1 className='font-bold text-xl'>{index + 1}. {training.name}</h1>
												<p>From: {training.fromyear} To: {training.toyear}</p>
											</div>
										</div>
									</SwiperSlide>
								})
							}
						</Swiper>
					</div>
					<div className={achievements.length !== 0 ? 'pb-6 select-none' : "hidden"}>
						<h1 className='text-center font-bold text-3xl mb-5 mt-10'>Achievement</h1>
						<Swiper
							spaceBetween={50}
							slidesPerView={2}
						>
							{
								achievements && achievements.map((achievement, index) => {
									return <SwiperSlide>
										<div className='text-center py-3 px-4 shadow-lg rounded-lg border'>
											<div>
												<h1 className='font-bold text-xl'>{index + 1}. {achievement.name}</h1>
												<p>From: {achievement.fromyear} To: {achievement.toyear}</p>
											</div>
										</div>
									</SwiperSlide>
								})
							}
						</Swiper>
					</div>
				</form>
			</Layout>
		</>
	)
}

export default Profile