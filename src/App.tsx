import { Provider } from 'react-redux'
import { RouterProvider} from 'react-router-dom'
import router from './routers/baseRouter'
import { store } from './store/store'
import './App.css'

function App() {

  return (
    <Provider store={store}>
      <RouterProvider router={ router } />
    </Provider>
  )
}

export default App
