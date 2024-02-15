import Chat from '../components/Chat/Chat'
import Sidebar from '../components/Sidebar/Sidebar'

const Home: React.FC = () => {
  return (
    <section className='flex justify-center items-center h-[100dvh] p-2'>
      <div className='flex w-full h-full rounded-md border border-zinc-400 bg-white'>
        <Sidebar />
        <Chat />
      </div>
    </section>
  )
}
export default Home
