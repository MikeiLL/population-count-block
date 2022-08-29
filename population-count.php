<?php
/**
 * Plugin Name:       Population Count
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       population-count
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_population_count_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_population_count_block_init' );

function population_count_enqueue_scripts(){

	wp_register_script( 'population-count-js', plugin_dir_url( __FILE__ ) . 'js/main.js', ['jquery'], '1.0.0', true );
	wp_enqueue_script( 'population-count-js' );

}
add_action( 'wp_enqueue_scripts', 'population_count_enqueue_scripts' );
add_action( 'admin_enqueue_scripts', 'population_count_enqueue_scripts' );
