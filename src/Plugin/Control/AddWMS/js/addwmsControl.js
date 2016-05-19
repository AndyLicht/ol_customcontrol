(function($)
{
ol.control.addwmsControl = function(opt_options,ol3_map) 
{
    var options = opt_options || {};

    var button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = 'WMS';

    var this_ = this;
    
    var element = document.createElement('div');
    element.className = 'addwms-button ol-unselectable ol-control';
    element.appendChild(button);

    button.onclick = function(e) 
    {
        e.preventDefault();
        ol.control.addLayer();
    };


    ol.control.Control.call(this, {
	element: element,
	target: options.target
    });
};
ol.control.addLayer = function (map)
{
    var id = $('.openlayers-map').attr('id');
    var map = Drupal.openlayers.getMapById(id).map;
    var bound = new ol.layer.Tile({
        name:'HUHU',
        base:false,
        opacity:'0.2',
        visible:true,
        tree_uid:guid(),
        tree_extent:'-13884991, 2870341, -7455066, 6338219',
        tree_name:'usa',
        tree_title:'USA',
        tree_group:'none',
        extent: [-13884991, 2870341, -7455066, 6338219],
        source: new ol.source.TileWMS(/** @type {olx.source.TileWMSOptions} */ (
        {
            url: 'http://demo.boundlessgeo.com/geoserver/wms',
            params: {'LAYERS': 'topp:states', 'TILED': true,},
            
        }))
    });
    map.addLayer(bound);
}
ol.inherits(ol.control.addwmsControl, ol.control.Control);
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
})(jQuery);