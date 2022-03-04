import React from 'react'
import { Error, ERROR_PAGE_404 } from 'components/pages/Error'

const Error404Page = () => (
  <Error
    description="The page you are looking for might not exist"
    title="Error 404 · page not found"
    variant={ERROR_PAGE_404}
  />
)

export default Error404Page
