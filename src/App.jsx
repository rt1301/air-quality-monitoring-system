import Header from './Components/Header'
import Dashboard from './Components/Dashboard'
import Analysis from './Components/Analysis'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Dashboard />
      </>
    ),
  },
  {
    path: "/monitor",
    element: (
      <>
        <Header />
        <Analysis />
      </>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
