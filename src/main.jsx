import { ApolloProvider } from '@apollo/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Forms from './forms.jsx'
import Generica from './generica'
import { client } from './lib/apollo'
import MteForms from './mteForms.jsx'
import Obras from './obras.jsx'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Obras />,
  },

  {
    path: '/generica',
    element: <MteForms />,
  },
  {
    path: 'forms/:id',
    element: <Forms />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
)
