import Chats from './Chats'
import Profile from './Profile'
import Search from './Search'

const Sidebar: React.FC = () => {
  return (
    <div className='flex flex-col gap-1 max-w-40 sm:max-w-80 rounded-l-lg shadow-2xl bg-[#efefef]]'>
      <Search />
      <Chats />
      <Profile />
    </div>
  )
}
export default Sidebar
