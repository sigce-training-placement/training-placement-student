import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { BsCheckLg } from 'react-icons/bs'

const NoticeModal = ({ show = true, setShow, clickHandler }) => {
	const [time, setTime] = useState(5)
	const [check, setCheck] = useState(false)
	useEffect(() => {
		if (check) {
			window.localStorage.setItem('showNotice', false)
		}
	}, [check]);
	return (
		<>
			<div className={show ? 'z-[3000] duration-500 h-screen w-screen fixed bg-black top-0 left-0 bg-opacity-70 opacity-100' : 'z-[3000] pointer-events-none duration-500 h-screen w-screen fixed bg-black top-0 left-0 bg-opacity-60 opacity-0'}></div>
			<div className={show ? 'z-[3000] p-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] w-[60vw] bg-white rounded-xl shadow-xl duration-500 opacity-100' : 'z-[3000] fixed top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] w-[60vw] bg-white rounded-xl shadow-xl duration-500 opacity-0 pointer-events-none p-4 '}>
				<button onClick={() => { clickHandler(); setShow(false) }} className='hover:bg-gray-200 duration-300 absolute top-3 right-5 text-sm h-8 w-8 flex justify-center items-center bg-gray-300 rounded-xl'><IoClose /></button>
				<h1 className='text-xl font-bold text-center'>Important Notice</h1>
				<div className='w-full mt-2'>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet adipisci praesentium, harum earum fuga qui quaerat quia pariatur necessitatibus debitis optio et non accusamus. Sunt impedit dignissimos corrupti nisi ea rerum quod aspernatur repellat recusandae blanditiis. Rem in consequuntur inventore.
				</div>
				<input type="checkbox" id="checkbox" checked={check} className="hidden" onChange={(e) => {
					setCheck(e.target.checked)
					window.localStorage.setItem("showNotice", false)
				}} />
				<label htmlFor="checkbox" className='flex items-center'><span className={check ? "cursor-pointer text-lg flex justify-center items-center w-10 h-10 rounded-xl scale-50 bg-blue-500 border border-blue-500 duration-200" : "cursor-pointer duration-200 text-lg flex justify-center items-center w-10 h-10 rounded-xl scale-50 bg-gray-200 border border-gray-500"}>{check && <BsCheckLg className='text-white text-xl' />}</span><label htmlFor="checkbox" className='select-none font-semibold cursor-pointer'>Don't show this again</label></label>
			</div>
		</>
	)
}

export default NoticeModal