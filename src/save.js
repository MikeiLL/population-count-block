/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save(props) {

	const {
		attributes: { preamble, closing },
			setAttributes,
	} = props;

	return (
		<div { ...useBlockProps.save() }>
			<RichText.Content
				tagName="span"
				className="preamble"
				value={ preamble }
			/>
			<span id="population-count-container" class="population-count-count"> ___ </span>
			<RichText.Content
				tagName="span"
				className="closing"
				value={ closing }
			/>
		</div>
	);
}