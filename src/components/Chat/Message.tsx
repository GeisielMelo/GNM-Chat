import { useAuth } from '../../context/AuthContext'

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
    <div className={owner ? 'flex justify-end' : ''}>
      <div className='flex items-end gap-4 mt-2 p-2 max-w-max rounded bg-green-300'>
        <p>{message.text}</p>
        <p className='text-xs max-h-4 whitespace-nowrap'>{handleConvertTimestamp(message.data.seconds)}</p>
      </div>
    </div>
  )
}

export default Message
