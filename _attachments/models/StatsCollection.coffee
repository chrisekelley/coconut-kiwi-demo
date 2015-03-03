class StatsCollection extends Backbone.Collection
  model: Stat
  url: '/result'
  parse: (response) ->
    keys = []
    values = []
    processRow = (obj)->
      keys.push obj.key
      values.push obj.value
    _.each(response.rows,processRow)
    stats = _.object(keys, values);
    return stats
#    response.rows;



