import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Global } from '@emotion/core'
import objectFitImages from 'object-fit-images'
import 'reset-css'

objectFitImages()

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Fragment>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Global
          styles={{
            '*': {
              fontFamily: 'Helvetica !important',
            },
            '.slider-list': {
              cursor: 'initial !important',
            },
            '.slider-control-centerright, .slider-control-centerleft': {
              height: '100%',
            },
          }}
        />
        <div>{children}</div>
      </Fragment>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
