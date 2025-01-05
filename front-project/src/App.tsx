import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {
  Route,
  Routes,
  BrowserRouter,
} from 'react-router-dom';
import { ROUTES } from './assets/constants'
import Layout from './components/Layout';
import Home from './pages/Home';
import Lists from './pages/Lists';
import CreateAirport from './pages/CreateAirport';
import AirportElement from './pages/AirportElement';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.login} element={<Login />} />
          <Route path={ROUTES.home} element={<Layout />} >
            <Route index element={<Home />} />
            <Route path={ROUTES.favourites} element={<Lists />} />
            <Route path={ROUTES.airport} element={<AirportElement />} />
            <Route path={ROUTES.create} element={<CreateAirport />} />
          </Route>

          {/* 404 not found route */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
