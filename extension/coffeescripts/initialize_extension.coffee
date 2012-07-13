window.router = new BH.Router()

Backbone.history.start()

if location.hash == ''
  route = state.get('route')
  router.navigate(route, trigger: true)
