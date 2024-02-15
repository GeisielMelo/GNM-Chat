import Chats from './Chats'
import Profile from './Profile'
import Search from './Search'

const Sidebar: React.FC = () => {
  return (
    <div className='max-w-80 w-full border border-r-zinc-400'>
      <Search />
      <Chats />
      <Profile />
    </div>
  )
}
export default Sidebar
