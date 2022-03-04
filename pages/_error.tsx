import React from 'react'
import { Error, ERROR_PAGE_500 } from 'components/pages/Error'

const ErrorPage = () => (
  <Error
    description="The page you are looking for might have been removed had its name
  changed or is temporarily unvailable"
    title="Error 500"
    variant={ERROR_PAGE_500}
  />
)

export default ErrorPage
