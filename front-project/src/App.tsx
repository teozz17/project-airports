import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {
  Route,
  Routes,
  BrowserRouter,
} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Lists from './pages/Lists';
import CreateAirport from './pages/CreateAirport';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Lists />} />
            <Route path="/create" element={<CreateAirport />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
