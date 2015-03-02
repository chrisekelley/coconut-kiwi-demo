class StatsHeaderDashboardView extends Backbone.View
#  el: '#content table tbody'
#  el: ''
  tagName: 'p'

  render: =>
      @$el.html '<h2>' + polyglot.t("Statistics") + '<h2>'
