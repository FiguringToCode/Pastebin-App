// import "./App.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home';
import PasteView from './pages/PasteView';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/:id',
    element: <PasteView />,
  }
])


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
