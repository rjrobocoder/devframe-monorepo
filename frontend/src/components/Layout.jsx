import React from 'react'
import Header from './Header'

const Layout = ({children}) => {
  return (
    <div>
        <header>
            <Header/>
        </header>
        <main>
            {children}
        </main>
    </div>
  )
}

export default Layout