'use client'
import { useUser } from '@/context'
import { onAuth } from '@/firebase/utils'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Msg from '@/components/Msg'
export default function layout({ children }) {
  const { user, userDB, setUserProfile, setUserData, success } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user === undefined) onAuth(setUserProfile, setUserData)
    if (user && user !== undefined && userDB === null) router.push('/Register')
    if (userDB && userDB !== undefined) router.replace('/')
  }, [user, userDB])
  return (
    <main className='relative h-screen min-h-[640px] flex flex-col justify-center items-center '
      style={{
        // backgroundImage: 'url(/bg.jpeg)',
        // backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: 'center',
        // //  background: 'linear-gradient(0deg, #ffffff 50%, #00E2FF 50%)' 
        // backgroundColor: '#00E2FF'
      }}>
        <div
        className='absolute top-0 w-full h-[50vh] flex flex-col justify-center items-center z-20'
        style={{
          backgroundImage: 'url(/bg.jpeg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          //  background: 'linear-gradient(0deg, #ffffff 50%, #00E2FF 50%)' 
          backgroundColor: '#00E2FF'
        }}></div>
      <div
        className='absolute top-0 w-full h-[50vh] flex flex-col justify-center items-center z-20'
        style={{
          background: ' #00E2FF80 50%'
          //  background: 'linear-gradient(0deg, #ffffff80 50%, #00E2FF80 50%)' 
        }}>
      </div>
      <div className='relative w-full text-center flex justify-center bg-transparent py-5 z-30'>
        <img src="/logo.png" className='h-[80px]' alt="User" />
      </div>
      <div className='z-50'>
        {children}
      </div>

      {success == 'AccountNonExist' && <Msg>Cuenta inexistente</Msg>}
      {success == 'CompleteEmail' && <Msg>Introduce tu email</Msg>}
      {success == 'Complete' && <Msg>Complete el formulario</Msg>}
      {success == 'PasswordMin' && <Msg>La contraseña es muy corta</Msg>}
      {success == 'Te enviamos un correo...' && <Msg>Te enviamos un correo...</Msg>}
      {success == 'Firebase: Error (auth/email-already-in-use).' && <Msg>La cuenta ya esta en uso</Msg>}
    </main>
  )
}