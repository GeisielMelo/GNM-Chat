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
      setErr(true)
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
    <div className='p-2'>
      <div>
        <input
          className='w-full pl-2 border border-zinc-400 rounded'
          type='e-mail'
          autoComplete='off'
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={'Search or start a new chat.'}
        />
      </div>

      {err && <span>User not found!</span>}

      {searched && (
        <div className='flex justify-between p-2 mt-2 border border-zinc-400' onClick={handleSelect}>
          <div className='flex gap-2 capitalize'>
            {searched.photoURL ? (
              <img className='w-6 h-6 rounded-full object-cover' src={searched.photoURL} alt='user image' />
            ) : (
              <h1 className='capitalize text-center text-white bg-zinc-400 w-6 h-6 rounded-full'>
                {searched.displayName ? searched.displayName[0] : 'N/A'}
              </h1>
            )}
            <div className='userChatInfo'>
              <span>{searched.displayName ? searched.displayName : 'N/A'}</span>
            </div>
          </div>
          <button className='' onClick={() => handleReset()}>
            <X />
          </button>
        </div>
      )}
    </div>
  )
}
export default Search
