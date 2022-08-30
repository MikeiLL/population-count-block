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
import { RichText, BlockControls, AlignmentToolbar, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { RangeControl, ButtonGroup, Button, BaseControl, TextControl, ToggleControl, Panel, PanelBody, PanelRow } from '@wordpress/components';


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
		attributes: {preamble, closing, alignment},
		className, focus,
		setAttributes,
	} = props;

	function onChangeAlignment( updatedAlignment ) {
		setAttributes( { alignment: updatedAlignment } );
	}

	const onChangePreamble = ( value ) => {
		setAttributes( { preamble: value } );
	};

	const onChangeClosing = ( value ) => {
		setAttributes( { closing: value } );
	};
	console.log(props.attributes.fontsize);
	return (
		<div {...useBlockProps()}>
			<BlockControls>
				<AlignmentToolbar
					value={alignment}
					onChange={ onChangeAlignment } />
			</BlockControls>
			<InspectorControls>
				<PanelBody
				title='Additional Settings'
					initialOpen="true">
					<PanelRow>
						<BaseControl>
							<RangeControl
								label="Font Size (em)"
								min={0.5}
								max={10}
								step={0.1}
								value={props.attributes.fontsize}
								onChange={ value => setAttributes( {fontsize: value}) }
							/>
						</BaseControl>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<p style={{textAlign: alignment}}>
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
				<span id="population-count-container" class="population-count-count"> </span>
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
			</p>
		</div>
	);
}
