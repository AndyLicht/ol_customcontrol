(function($)
{
    ol.control.pdfexportControl = function(opt_options, ol3_map)
    {
        var options = opt_options || {};
        var loading = 0;
        var loaded = 0;
        var dims = 
        {
            a0: [1189, 841],
            a1: [841, 594],
            a2: [594, 420],
            a3: [420, 297],
            a4: [297, 210],
            a5: [210, 148]
        };
        
        var resolution = 
        {
            dpi72:72,
            dpi150:150,
            dpi300:300
        }
        var map = ol3_map;
        var button = document.createElement('button');
        button.type = 'button';
        button.id = 'button-label'
        button.innerHTML = 'PDF';

        var element = document.createElement('div');
        element.className = 'ol-unselectable ol-control ol-control-pdfexport';
        element.appendChild(button);
        
        button.addEventListener('click', function() 
        {
            button.disabled = true;
            document.body.style.cursor = 'progress';
            var format = 'a4';
            var resolution_ = 'dpi150';
            var dim = dims[format];
            var res = resolution[resolution_];
            var width = Math.round(dim[0] * res / 25.4);
            var height = Math.round(dim[1] * res / 25.4);
            var size = /** @type {ol.Size} */ (map.getSize());
            var extent = map.getView().calculateExtent(size);
            //aktiven Baselayer erhalten
            
            baselayer = ol.control.pdfexportControl.getActiveBaseLayer();
            var source = baselayer.getSource();
            
            var tileLoadStart = function() 
            {
                ++loading;
            };
            
            var tileLoadEnd = new Image();
            tileLoadEnd.crossOrigin = "Anonymous";
            tileLoadEnd = function() 
            {
                ++loaded;
                if (loading === loaded) 
                {
                    var canvas = this;
                    //canvas.crossOrigin('anonymous');
                    window.setTimeout(function() 
                    {
                        console.log('timeout');
                        loading = 0;
                        loaded = 0;
                        var data = new Image();
                        data.setAttribute('crossOrigin', 'anonymous');
                        data = canvas.toDataURL('image/png');
                        var pdf = new jsPDF('landscape', undefined, format);
                        pdf.addImage(data, 'JPEG', 0, 0, dim[0], dim[1]);
                        pdf.save('map.pdf');
                        source.un('tileloadstart', tileLoadStart);
                        source.un('tileloadend', tileLoadEnd, canvas);
                        source.un('tileloaderror', tileLoadEnd, canvas);
                        map.setSize(size);
                        map.getView().fit(extent, size);
                        map.renderSync();
                        button.disabled = false;
                        document.body.style.cursor = 'auto';
                    }, 100);
                }
            };
            
            map.once('postcompose', function(event) 
            {
                source.on('tileloadstart', tileLoadStart);
                source.on('tileloadend', tileLoadEnd, event.context.canvas);
                source.on('tileloaderror', tileLoadEnd, event.context.canvas);
            });
            
            map.setSize([width, height]);
            map.getView().fit(extent, /** @type {ol.Size} */ (map.getSize()));
            map.renderSync();
            
        },false);
        
        
        
        
        ol.control.Control.call(this, 
        {
            element: element,
            target: options.target
        });
    };
    
    
    
    
     /*OL3 Funktionen*/
    ol.control.pdfexportControl.getActiveBaseLayer = function()
    {
        var layertree = [];
        var layer_;
        var id = $('.openlayers-map').attr('id');
        var map = Drupal.openlayers.getMapById(id).map;
        layertree = map.getLayers();
        layertree.forEach(function(layer) 
        {
            if ((layer.get('base') === true) && (layer.getVisible() === 1))
            {  
                layer_ = layer;
            };
        });
        return layer_;
    };
    ol.inherits( ol.control.pdfexportControl, ol.control.Control);
})(jQuery);



