<?php

$aContext = array(
    'http' => array(
        'proxy' => 'gate-f.bkg:8000',
        'request_fulluri' => true,
    ),
);
$options = stream_context_create($aContext);
$feed = file_get_contents($_POST['wmsurl'],False,$options);
$xml = new SimpleXMLElement($feed);
$row = '<div><h4 id="servicename">';
$title = $xml->xpath("//*[local-name()='WMS_Capabilities']//*[local-name()='Service']/*[local-name()='Title']");
if(sizeof($title) > 0)
{
	foreach ($title as $key => $value)
	{
		$title = (string)$value;
	}
	$row = $row.$title.'</h4><div class="row">';
}

$imageformate = $xml->xpath("//*[local-name()='GetMap']/*[local-name()='Format']");
$imageradiobutton = '<div class="col-md-6"><h4>Image Format</h4>';
foreach ($imageformate as $key =>$value)
{
	if((strpos($value,'application') === false))
	{
		$imageradiobutton = $imageradiobutton."<label><input type='radio' name='imageformat' value='".(string)$value."'>".(string)$value."</label><br>";
	}
}
$imageradiobutton = $imageradiobutton.'</div>';

$layername = $xml->xpath("//*[local-name()='Capability']/*[local-name()='Layer']/*[local-name()='Layer']/*[local-name()='Name']");
$layertitle = $xml->xpath("//*[local-name()='Capability']/*[local-name()='Layer']/*[local-name()='Layer']/*[local-name()='Title']");
$layercheckboxen = '<div><h4>Layer</h4><div class="checkbox">';
$i = 0;
foreach ($layername as $key =>$value)
{
	$layercheckboxen = $layercheckboxen."<label><input type='checkbox' name='servicelayer' layername='".(string)$value."'>".$layertitle[$i]."</label><br>";
	$i++;
}

$layercheckboxen = $layercheckboxen.'</div>';
$endofrow = '<button type="button" id="loadwms">WMS laden</button><button type="button" id="closeoverlay">Close</button></div></div>'; 
$output = $row.$imageradiobutton.$layercheckboxen.$endofrow;
echo $output;
?>