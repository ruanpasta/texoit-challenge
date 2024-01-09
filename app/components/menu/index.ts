import Item, { links as ItemLinks } from './MenuItem'
import Root, { links as RootLinks } from './MenuRoot'

const components = {
  Root,
  Item,
}

const links = {
  RootLinks,
  ItemLinks
}

export const Menu = {
  ...components,
  ...links
}