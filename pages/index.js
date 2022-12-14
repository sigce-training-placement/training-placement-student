import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Layout from '../components/Layout'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../context/firebase_config'
import Link from 'next/link';
import { useRouter } from 'next/router';
import NoticeModal from '../components/NoticeModal'
import { useUserAuth } from '../context/auth';

export default function Home({ setMessage }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const { showNotice, setShowNotice } = useUserAuth()

  const handleClick = () => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push('/dashboard')
        const user = userCredential.user;
        setLoading(false)
        setMessage('Logged In Successfully!')
      })
      .catch((error) => {
        console.log(error)
        setMessage("Something went wrong!")
        setLoading(false)
      });
  }

  const manageModal = () => {
    if (email?.length < 6 || password?.length < 4) {
      setMessage("Fill details properly")
    } else {
      const condition = window.localStorage.getItem('showNotice') === 'true'
      if (condition) {
        setShowNotice(true);
      } else {
        handleClick()
      }
    }
  }
  return (
    <>
      <NoticeModal show={showNotice} setShow={setShowNotice} clickHandler={handleClick} />
      <Layout title={"Home"} navbar={false} className="flex justify-center items-center">
        <div className='w-6/12 bg-white rounded-xl px-10 py-5 m-auto shadow-lg'>
          <h1 className='text-center font-bold text-3xl mb-5'>Login</h1>
          <div>
            <Input type={'email'} label={'Email: '} value={email} changeHandler={(e) => { setEmail(e.target.value) }} placeholder={'Enter Your Email Address'} id={'adminEmail'} />
            <Input type="password" label={'Password: '} value={password} changeHandler={(e) => { setPassword(e.target.value) }} placeholder={'Enter Your Password'} id={'adminPassword'} className={'mt-3'} />
            <p className='mt-3 font-bold text-right cursor-pointer'>forget password?</p>
            <Button loading={loading} handler={manageModal} className={'mt-3 m-auto w-full'} text="Login" />
            <p className='mt-3 text-md font-semibold text-center'>Don't have an account? <Link className='text-blue-400' href="/signup">Sign Up</Link></p>
          </div>
        </div>
      </Layout>
    </>
  )
}
