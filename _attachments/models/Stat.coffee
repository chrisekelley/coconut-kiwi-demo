class Stat extends Backbone.Model
  initialize: ->
    unless this.attributes.createdAt
      @set
        collection: 'stat'
        createdAt: moment(new Date()).format(Coconut.config.get "datetime_format")
    unless this.attributes.lastModifiedAt
      @set
        lastModifiedAt: moment(new Date()).format(Coconut.config.get "datetime_format")
  url: "/stat"


