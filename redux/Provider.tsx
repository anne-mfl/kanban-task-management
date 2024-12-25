'use client'

import { Provider } from "react-redux"
import store from './store'

function Providers({ children }: { children: React.ReactNode }) {

  // expose store when run in Cypress
  // if (typeof window !== 'undefined' && window.Cypress) {
    // (window as any).store = store;
  // }

  return <Provider store={store}>{children}</Provider>
}

export default Providers