describe 'BH.Models.State', ->
  beforeEach ->
    timekeeper.freeze(new Date('10-23-12'))

    @state = new BH.Models.State null,
      settings: new BH.Models.Settings()

  afterEach ->
    timekeeper.reset()

  describe '#initialize', ->
    it 'sets the route to the current week view', ->
      expect(@state.get('route')).toEqual '#weeks/10-22-12'

    it 'persists itself in the state local storage store', ->
      expect(@state.storeName).toEqual 'state'

  describe '#updateRoute', ->
    describe 'when the open location is the current day', ->
      beforeEach ->
        @state.settings.set openLocation: 'current_day'

      it 'sets the route to the current day url', ->
        @state.updateRoute()
        expect(@state.get('route')).toEqual '#days/10-23-12'

    describe 'when the open location is the current week', ->
      beforeEach ->
        @state.settings.set openLocation: 'current_week'

      it 'sets the route to the current week url', ->
        @state.updateRoute()
        expect(@state.get('route')).toEqual '#weeks/10-22-12'
