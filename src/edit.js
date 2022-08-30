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
		attributes: {preamble, closing, alignment, fontsize},
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

	return (
		<div {...useBlockProps()}>
			<BlockControls>
				<AlignmentToolbar
					value={alignment}
					onChange={ onChangeAlignment } />
			</BlockControls>
			<InspectorControls>
				<PanelBody
				title='Type Settings'
					initialOpen="true">
					<PanelRow>
						<BaseControl label="Outer" className="kb-responsive-range-control">

							<div className="kadence-title-bar">
								<span className="kadence-control-title">Font Size</span>
								<ButtonGroup className="kb-measure-responsive-options" aria-label="Device">
									<Button className="kb-responsive-btn kb-desk-tab is-active is-small">
										<span className="dashicon dashicons dashicons-desktop"></span>
									</Button>
									<Button className="kb-responsive-btn kb-tablet-tab is-small">
										<span className="dashicon dashicons dashicons-tablet"></span>
									</Button>
									<Button className="kb-responsive-btn kb-mobile-tab is-small">
										<span className="dashicon dashicons dashicons-smartphone"></span>
									</Button>
								</ButtonGroup>
							</div>

							<div className="kadence-controls-content kb-responsive-range-control-inner">
								<BaseControl label="Middle" className="kadence-range-control">
									<div className="kadence-range-control-inner">

										<BaseControl
											className="components-base-control components-range-control kadence-range-control-range"
											label="Inner"
											>
											<RangeControl
													value={ fontsize }
													onChange={ ( value ) => setAttributes( {fontsize: value} ) }
													min={ 2 }
													max={ 10 }
											/>
										</BaseControl>

										<div className="kadence-units"> em</div>

									</div>
								</BaseControl>
							</div>
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
