import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'

const Home: React.FC = () => {
  return (
    <section className='flex justify-center items-center h-[100dvh] md:p-2 bg-gradient-to-tl from-[#49A348] via-[#D9FDD3] to-[#F4FBF3]'>
      <div className='flex w-full h-full gap-[2px] md:rounded-lg shadow shadow-black/60 bg-[#efefef]'>
        <Sidebar />
        <Chat />
      </div>
    </section>
  )
}
export default Home
