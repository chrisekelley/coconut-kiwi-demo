SiteNavView = Backbone.Marionette.ItemView.extend
  template: JST["_attachments/templates/SiteNavView.handlebars"]
  events:
    "click .navbar-nav li": "toggle"
  toggle : =>
#    check if window is small enough so dropdown is created
    toggle = $(".navbar-toggle").is(":visible")
    if toggle
      $(".navbar-collapse").collapse('hide');
