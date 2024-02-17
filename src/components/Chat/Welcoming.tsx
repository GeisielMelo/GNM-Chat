import logo from '../../assets/logo.svg'

const Welcoming = () => {
  return (
    <div className='flex flex-col p-4 gap-2 items-center text-center'>
      <img className='max-w-20' src={logo} alt='image referring to the application logo' />
      <h1>GNM - Chat</h1>
      <p>Send and receive messages anytime, anywhere.</p>
    </div>
  )
}
export default Welcoming
