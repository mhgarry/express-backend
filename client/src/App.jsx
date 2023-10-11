
import { Routes , BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
  <BrowserRouter>
    <Routes>
      <Route  path='/login' element={<Login />} />
      <Route  path='/register' element={<Register />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;