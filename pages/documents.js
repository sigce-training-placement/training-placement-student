import Link from 'next/link'
import React, { useState } from 'react'
import Input from '../components/Input'
import Layout from '../components/Layout'
import { useUserAuth } from '../context/auth'
import { AiOutlineLink } from 'react-icons/ai'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from '../context/firebase_config'
import { doc, updateDoc } from 'firebase/firestore'
import NoticeModal from '../components/NoticeModal'

const Documents = ({ setMessage }) => {
  const { user, userData } = useUserAuth()
  const [uploading, setUploading] = useState(0)
  const uploadFile = (e, path, attr) => {
    let data = userData
    if (e && e.target.files[0]) {
      if (Math.ceil(e.target.files[0].size / 1048576) >= 2) {
        alert("Large file")
      } else {
        const storageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploading(progress)
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
            // Handle unsuccessful uploads
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              const docRef = doc(db, "users", user.uid);
              data[attr] = downloadURL;
              await updateDoc(docRef, data)
                .then(() => {
                  setUploading(0)
                  setMessage("Profile Updated!")
                })
            });
          }
        );
      }
    }
  }


  return (
    <>
    {/* <NoticeModal show={showNotice} setShow={setShowNotice}/> */}
      <Layout title={"Documents"} className="flex items-center" navbar={true}>
        <form className='m-auto w-11/12 bg-white rounded-xl shadow-lg px-6 py-6 h-[90vh] overflow-y-auto'>
          <h1 className='text-center font-bold text-3xl mb-5'>Documents</h1>
          <fieldset>
            <div className='grid grid-cols-2 gap-x-10 gap-y-5'>
              <div className={'flex gap-x-2 justify-between items-center'}><Input parentClass={userData && userData.sem1MarksheetDoc != undefined ? "w-11/12" : "w-full"} accept={"application/ pdf"} disabled={userData && userData.year < 1} label="Profile Photo" type='file' changeHandler={(e) => { uploadFile(e, `user-documents/${user.uid}/photoURL`, "photoURL") }} />{userData && userData.photoURL != undefined ? <div className='w-1/12 text-right mt-6 text-blue-500 text-xl'><a target={"_blank"} href={userData && userData.photoURL || ""}><AiOutlineLink /></a> </div> : ""}</div>
              <div className={'flex gap-x-2 justify-between items-center'}><Input parentClass={userData && userData.sem1MarksheetDoc != undefined ? "w-11/12" : "w-full"} accept={"application/ pdf"} disabled={userData && userData.year < 1} label="Resume" type='file' changeHandler={(e) => { uploadFile(e, `user-documents/${user.uid}/resume`, "resume") }} />{userData && userData.resume != undefined ? <div className='w-1/12 text-right mt-6 text-blue-500 text-xl'><a target={"_blank"} href={userData && userData.resume || ""}><AiOutlineLink /></a> </div> : ""}</div>
              <div className={'flex gap-x-2 justify-between items-center'}><Input parentClass={userData && userData.sem1MarksheetDoc != undefined ? "w-11/12" : "w-full"} accept={"application/ pdf"} disabled={userData && userData.year < 1} label="Sem-1 Marksheet" type='file' changeHandler={(e) => { uploadFile(e, `user-documents/${user.uid}/sem1MarksheetDoc`, "sem1MarksheetDoc") }} />{userData && userData.sem1MarksheetDoc != undefined ? <div className='w-1/12 text-right mt-6 text-blue-500 text-xl'><a target={"_blank"} href={userData && userData.sem1MarksheetDoc || ""}><AiOutlineLink /></a> </div> : ""}</div>
              <div className={'flex gap-x-2 justify-between items-center'}><Input parentClass={userData && userData.sem2MarksheetDoc != undefined ? "w-11/12" : "w-full"} accept={"application/ pdf"} disabled={userData && userData.year < 1} label="Sem-2 Marksheet" type='file' changeHandler={(e) => { uploadFile(e, `user-documents/${user.uid}/sem2MarksheetDoc`, "sem2MarksheetDoc") }} />{userData && userData.sem2MarksheetDoc != undefined ? <div className='w-1/12 text-right mt-6 text-blue-500 text-xl'><a target={"_blank"} href={userData && userData.sem2MarksheetDoc || ""}><AiOutlineLink /></a> </div> : ""}</div>
              <div className={'flex gap-x-2 justify-between items-center'}><Input parentClass={userData && userData.sem3MarksheetDoc != undefined ? "w-11/12" : "w-full"} accept={"application/ pdf"} disabled={userData && userData.year < 2} label="Sem-3 Marksheet" type='file' changeHandler={(e) => { uploadFile(e, `user-documents/${user.uid}/sem3MarksheetDoc`, "sem3MarksheetDoc") }} />{userData && userData.sem3MarksheetDoc != undefined ? <div className='w-1/12 text-right mt-6 text-blue-500 text-xl'><a target={"_blank"} href={userData && userData.sem3MarksheetDoc || ""}><AiOutlineLink /></a> </div> : ""}</div>
              <div className={'flex gap-x-2 justify-between items-center'}><Input parentClass={userData && userData.sem4MarksheetDoc != undefined ? "w-11/12" : "w-full"} accept={"application/ pdf"} disabled={userData && userData.year < 2} label="Sem-4 Marksheet" type='file' changeHandler={(e) => { uploadFile(e, `user-documents/${user.uid}/sem4MarksheetDoc`, "sem4MarksheetDoc") }} />{userData && userData.sem4MarksheetDoc != undefined ? <div className='w-1/12 text-right mt-6 text-blue-500 text-xl'><a target={"_blank"} href={userData && userData.sem4MarksheetDoc || ""}><AiOutlineLink /></a> </div> : ""}</div>
              <div className={'flex gap-x-2 justify-between items-center'}><Input parentClass={userData && userData.sem5MarksheetDoc != undefined ? "w-11/12" : "w-full"} accept={"application/ pdf"} disabled={userData && userData.year < 3} label="Sem-5 Marksheet" type='file' changeHandler={(e) => { uploadFile(e, `user-documents/${user.uid}/sem5MarksheetDoc`, "sem5MarksheetDoc") }} />{userData && userData.sem5MarksheetDoc != undefined ? <div className='w-1/12 text-right mt-6 text-blue-500 text-xl'><a target={"_blank"} href={userData && userData.sem5MarksheetDoc || ""}><AiOutlineLink /></a> </div> : ""}</div>
              <div className={'flex gap-x-2 justify-between items-center'}><Input parentClass={userData && userData.sem6MarksheetDoc != undefined ? "w-11/12" : "w-full"} accept={"application/ pdf"} disabled={userData && userData.year < 3} label="Sem-6 Marksheet" type='file' changeHandler={(e) => { uploadFile(e, `user-documents/${user.uid}/sem6MarksheetDoc`, "sem6MarksheetDoc") }} />{userData && userData.sem6MarksheetDoc != undefined ? <div className='w-1/12 text-right mt-6 text-blue-500 text-xl'><a target={"_blank"} href={userData && userData.sem6MarksheetDoc || ""}><AiOutlineLink /></a> </div> : ""}</div>
              <div className={'flex gap-x-2 justify-between items-center'}><Input parentClass={userData && userData.sem7MarksheetDoc != undefined ? "w-11/12" : "w-full"} accept={"application/ pdf"} disabled={userData && userData.year < 4} label="Sem-7 Marksheet" type='file' changeHandler={(e) => { uploadFile(e, `user-documents/${user.uid}/sem7MarksheetDoc`, "sem7MarksheetDoc") }} />{userData && userData.sem7MarksheetDoc != undefined ? <div className='w-1/12 text-right mt-6 text-blue-500 text-xl'><a target={"_blank"} href={userData && userData.sem7MarksheetDoc || ""}><AiOutlineLink /></a> </div> : ""}</div>
              <div className={'flex gap-x-2 justify-between items-center'}><Input parentClass={userData && userData.sem8MarksheetDoc != undefined ? "w-11/12" : "w-full"} accept={"application/ pdf"} disabled={userData && userData.year < 4} label="Sem-8 Marksheet" type='file' changeHandler={(e) => { uploadFile(e, `user-documents/${user.uid}/sem8MarksheetDoc`, "sem8MarksheetDoc") }} />{userData && userData.sem8MarksheetDoc != undefined ? <div className='w-1/12 text-right mt-6 text-blue-500 text-xl'><a target={"_blank"} href={userData && userData.sem8MarksheetDoc || ""}><AiOutlineLink /></a> </div> : ""}</div>
            </div>
          </fieldset>
          <div className='w-full h-3 bg-gray-300 mt-5 rounded-lg relative'>
            <span className='bg-green-500 absolute top-0 left-0 h-full rounded-lg duration-200' style={{ width: `${uploading}%` }}></span>
          </div>
        </form>
      </Layout>
    </>
  )
}

export default Documents