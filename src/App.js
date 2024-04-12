import React, { Fragment, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes' 
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import Loading from './components/LoadingComponent/Loading'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div style={{height: '100vh', width: '100%'}}>
      <Loading isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
              return (
                <Route key={route.path} path={route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
                } />
              )
            })}
          </Routes>
          
        </Router>
      </Loading>
    </div>
  )
}

export default App;
