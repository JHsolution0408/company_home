const React = require('react')

module.exports = {
  ...jest.requireActual('gatsby'),
  // Gatsby navigate mock
  navigate: jest.fn(),
  Link: ({ to, children, ...rest }) => React.createElement('a', { href: to, ...rest }, children),
  graphql: () => {},
  StaticQuery: () => {},
  useStaticQuery: () => ({}),
}
