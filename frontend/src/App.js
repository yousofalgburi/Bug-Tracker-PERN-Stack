import Auth from './components/Auth/Auth'
import BugDetailPage from './components/BugDetailPage/BugDetailPage'
import Home from './components/Home/Home'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { BugsContextProvider } from './context/BugsContext'

function App() {
  return (
    <BugsContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/auth' exact component={Auth}></Route>
          <Route path='/:id' exact component={BugDetailPage}></Route>
          <Route path='*' exact component={Home}></Route>
        </Switch>
      </BrowserRouter>
    </BugsContextProvider>
  )
}

export default App