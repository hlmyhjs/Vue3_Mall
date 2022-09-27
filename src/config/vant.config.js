import { Stepper, AddressEdit, Checkbox, Badge, Skeleton, Loading, Tab, Tabs, Swipe, SwipeItem } from 'vant'

export function vant(app) {
  app.use(Stepper)
  app.use(AddressEdit)
  app.use(Checkbox)
  app.use(Badge)
  app.use(Skeleton)
  app.use(Loading)
  app.use(Tab)
  app.use(Tabs)
  app.use(Swipe)
  app.use(SwipeItem)
}
