/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { RichText, useBlockProps} from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const {
		attributes: { preamble, closing },
		setAttributes,
	} = props;

	const onChangePreamble = ( value ) => {
		setAttributes( { preamble: value } );
	};
	const onChangeClosing = ( value ) => {
		setAttributes( { closing: value } );
	};
	return (
		<div {...useBlockProps()}>
			<RichText
				tagName="span"
				className="steps"
				placeholder={ __(
					'Preamble',
					'population-count'
				) }
				value={ preamble }
				onChange={ onChangePreamble }
			/>
			<span id="population-count-container" class="population-count-count"> ___ </span>
			<RichText
				tagName="span"
				className="steps"
				placeholder={ __(
					'Closing',
					'population-count'
				) }
				value={ closing }
				onChange={ onChangeClosing }
			/>
		</div>
	);
}