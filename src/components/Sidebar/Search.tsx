import { useState } from 'react'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { database } from '../../config/firebase'
import { User } from 'firebase/auth'
import { X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const Search: React.FC = () => {
  const { user } = useAuth()
  const [userEmail, setUserEmail] = useState('')
  const [searched, setSearched] = useState<User | undefined>(undefined)
  const [err, setErr] = useState(false)

  const handleSearch = async () => {
    const q = query(collection(database, 'users'), where('email', '==', userEmail))
    try {
      const querySnapshot = await getDocs(q)
      setSearched(querySnapshot.docs[0].data() as User)
    } catch (error) {
      handleSetErrTimer()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleReset = () => {
    setUserEmail('')
    setSearched(undefined)
    setErr(false)
  }

  const handleSetErrTimer = () => {
    setErr(true)
    setTimeout(() => {
      setErr(false)
    }, 2000)
  }

  const handleSelect = async () => {
    if (!user || !searched) return

    try {
      const combinedId = user.uid > searched.uid ? user.uid + searched.uid : searched.uid + user.uid
      const res = await getDoc(doc(database, 'chats', combinedId))

      if (!res.exists()) {
        await setDoc(doc(database, 'chats', combinedId), { messages: [] })

        await updateDoc(doc(database, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: searched.uid,
            displayName: searched.displayName || 'N/A',
            photoURL: searched.photoURL || 'N/A',
          },
          [combinedId + '.date']: serverTimestamp(),
        })

        await updateDoc(doc(database, 'userChats', searched.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName || 'N/A',
            photoURL: user.photoURL || 'N/A',
          },
          [combinedId + '.date']: serverTimestamp(),
        })
      }
    } catch (error) {
      handleReset()
    }
  }

  return (
    <>
      <div className='flex justify-center items-center px-2 h-[3.75rem] rounded-tl-lg shadow  bg-[#ffffff]'>
        <input
          className={`text-md w-full py-1 pl-4 outline-none rounded-full shadow ${err ? 'shadow-red-500' : 'shadow-black/20'}`}
          type='e-mail'
          autoComplete='off'
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={'Search'}
        />
      </div>

      {searched && (
        <div
          className='flex justify-between truncate mx-1 p-2 shadow cursor-pointer rounded active:bg-[#EFCFFF] transition-all'
          onClick={handleSelect}
        >
          <div className='flex gap-2 capitalize'>
            {searched.photoURL ? (
              <img className='w-6 h-6 rounded-full object-cover' src={searched.photoURL} alt='user image' />
            ) : (
              <h1 className='capitalize text-center text-white bg-zinc-400 w-6 h-6 rounded-full'>
                {searched.displayName ? searched.displayName[0] : 'N/A'}
              </h1>
            )}
            <div className='text-nowrap'>
              <span>{searched.displayName ? searched.displayName : 'N/A'}</span>
            </div>
          </div>
          <button className='text-red-600 text-sm active:text-red-800 transition-all' onClick={() => handleReset()}>
            <X size={16} />
          </button>
        </div>
      )}
    </>
  )
}

export default Search
