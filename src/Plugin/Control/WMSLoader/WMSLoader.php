<?php
/**
 * @file
 * Control: Alert
 */

namespace Drupal\openlayers_customcontrols\Plugin\Control\WMSLoader;
use Drupal\openlayers\Component\Annotation\OpenlayersPlugin;
use Drupal\openlayers\Types\Control;

/**
 * Class Rotate.
 *
 * @OpenlayersPlugin(
 *  id = "WMSLoader",
 *  description = "Display a small icon when clicked a Overlay is shown, which can be used for laoding a Web Map Service into the Map"
 * )
 *
 */
class WMSLoader extends Control {
	
	function form_wmsloader_wizard($form, &$form_state) 
	{
		if (empty($form_state['step'])) 
		{
			$form_state['step'] = 1;

			$form_state['step_information'] = _form_wmsloader_steps();
		}
		$step = &$form_state['step'];
		drupal_set_title(t('Schritte @step', array('@step' => $step)));

		$form = $form_state['step_information'][$step]['form']($form, $form_state);

		if ($step > 1) 
		{
			$form['prev'] = array(
				'#type' => 'submit',
				'#value' => t('Previous'),
				'#name' => 'prev',
				'#submit' => array('form_example_wizard_previous_submit'),
				'#limit_validation_errors' => array(),
			);
		}

		if ($step < count($form_state['step_information'])) 
		{
			$form['next'] = array(
				'#type' => 'submit',
				'#value' => t('Next'),
				'#name' => 'next',
				'#submit' => array('form_example_wizard_next_submit'),
			);
		}
		else 
		{
			$form['finish'] = array(
				'#type' => 'submit',
				'#value' => t('Finish'),
			);
		}

		if (function_exists($form_state['step_information'][$step]['form'] . '_validate')) 
		{
			$form['next']['#validate'] = array($form_state['step_information'][$step]['form'] . '_validate');
		}
		return $form;
	}
	
	function _form_wmsloader_steps() 
	{
		return array(
			1 => array(
				'form' => 'form_wmsloader_wizard_url',
			),
			2 => array(
				'form' => 'form_wmsloader_wizard_parsedXML',
			),
	);
	
	
	function form_example_wizard_url($form, &$form_state)
	{
		$form = array();
		$form['url'] = array(
			'#type' => 'textfield',
			'#title' => t('WMS GetCapabilities URL'),
			'#required' => TRUE,			
		);
		return $form;
	}
	function form_example_wizard_parsedXML($form, &$form_state)
	{
		$form = array();
		$form['layers'] = array(
			'#type' => 'textfield',
			'#title' => t('Choose a Layer'),
			'#required' => FALSE,			
		);
		return $form;
	}
	
}
	
	
	
	
	
	

}
