import Chat from '../components/Chat/Chat'
import Sidebar from '../components/Sidebar/Sidebar'

const Home: React.FC = () => {
  return (
    <section className='flex justify-center items-center h-[100dvh] p-4 bg-gradient-to-t from-[#6F5DCE] via-[#B793E5] to-[#EFCFFF]'>
      <div className='flex w-full h-full gap-[2px] rounded-lg shadow shadow-black/60 bg-[#efefef]'>
        <Sidebar />
        <Chat />
      </div>
    </section>
  )
}
export default Home
