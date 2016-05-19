Drupal.openlayers.pluginManager.register({
  fs: 'openlayers.Control:AddWMS',
  init: function(data) {
    return new ol.control.addwmsControl(data.opt,data.map);
  }
});


