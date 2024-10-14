
import './App.css'
import Navbar from './Componenets/Navbar'
import Manager from './Componenets/Manager'
import Footer from './Componenets/Footer'

function App() {

  return (
    <>
      <Navbar/>
      <div className='min-h-[70vh]'>
      <Manager/>
      </div>
      <Footer/>
    </>
    
  )
}

export default App
