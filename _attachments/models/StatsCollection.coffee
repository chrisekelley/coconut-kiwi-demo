class StatsCollection extends Backbone.Collection
  model: Result
  url: '/result'
  parse: (response) ->
    response.rows;


