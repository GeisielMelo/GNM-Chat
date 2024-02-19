import Chats from './Chats'
import Profile from './Profile'
import Search from './Search'

const Index: React.FC = () => {
  return (
    <div className='flex flex-col gap-1 max-w-20 md:max-w-80 w-full md:rounded-l-lg shadow-2xl bg-[#efefef]]'>
      <Search />
      <Chats />
      <Profile />
    </div>
  )
}
export default Index
