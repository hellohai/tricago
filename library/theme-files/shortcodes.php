<?php

	// [cta-button]Content Goes here <a href="#">Raw HTML Can be used as well</a>[/cta-block]
	function cta_block_setup($atts, $content = null){
	    return '<button class="cta-button'.(!empty($atts['color'])?' '.$atts['color']:'').(!empty($atts['cols'])?' '.$atts['cols'].'-col':'').'">'.$content.'</button>';
	}
	add_shortcode('cta-button', 'cta_block_setup');

	// [callout]
	function main_callout_setup($atts, $content = null){
	    return '<div class="callout'.($atts['color']!==''?' '.$atts['color']:'').'">'.$content.'</div>';
	}
	add_shortcode('callout', 'main_callout_setup');

	// [column_setup]
	function column_setup($atts, $content = null){
	    return '<div class="column-'.$atts['size'].'">'.$content.'</div>';
	}
	add_shortcode('column', 'column_setup');

	// [cta]
	function cta_setup($atts){
	    return (strpos($atts['size'], 'block')!==false?'<div>':'').'<a class="cta-button '.$atts['size'].'" href="'.$atts['link'].'" class="">'.$atts['text'].'</a>'.(strpos($atts['size'], 'block')!==false?'</div>':'');
	}
	add_shortcode('cta', 'cta_setup');

?>