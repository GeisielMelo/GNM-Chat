import { useAuth } from '../../context/AuthContext'
import { useEffect, useRef } from 'react'

type MessageProps = {
  message: {
    id: string
    text: string
    senderId: string
    data: {
      seconds: number
      nanoseconds: number
    }
  }
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { user } = useAuth()
  const owner = message.senderId === user?.uid
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [message])

  const handleConvertTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    const localTime = new Date(date.getTime())

    let hh = localTime.getHours()
    const mm = localTime.getMinutes()
    const period = hh >= 12 ? 'PM' : 'AM'
    hh = hh % 12 || 12

    return `${hh}:${mm < 10 ? '0' : ''}${mm} ${period}`
  }

  return (
    <div className={owner ? 'flex justify-end' : ''} ref={ref}>
      <div
        className={`flex flex-col items-end px-2 py-1 w-max max-w-[60%] rounded shadow ${owner ? 'bg-green-300' : 'bg-[#ffffff]'}`}
      >
        <p>{message.text}</p>
        <p className='text-xs/[12px] text-black/60 max-h-4 whitespace-nowrap'>
          {handleConvertTimestamp(message.data.seconds)}
        </p>
      </div>
    </div>
  )
}

export default Message
