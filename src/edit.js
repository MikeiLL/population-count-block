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
 * Source
 * https://github.com/WPDevelopers/notificationx/blob/3fb4647777b73450f7959617fb656f55e31cb1be/blocks/controls/src/controls/withResButtons/index.js
 * @see handle*BtnClick below */
import { dispatch } from "@wordpress/data";

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
		attributes: {preamble, closing, alignment, previewmode},
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

	const handleDesktopBtnClick = ({
		setPreviewDeviceType,
		setAttributes,
	}) => {
		setAttributes({
			previewmode: "Desktop",
		});
		setPreviewDeviceType("Desktop");
	};

	const handleTabBtnClick = ({ setPreviewDeviceType, setAttributes }) => {
		setAttributes({
			previewmode: "Tablet",
		});
		setPreviewDeviceType("Tablet");
	};

	const handleMobileBtnClick = ({
		setPreviewDeviceType,
		setAttributes,
	}) => {
		setAttributes({
			previewmode: "Mobile",
		});
		setPreviewDeviceType("Mobile");
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

					<div className="kadence-title-bar">
              <span className="kadence-control-title">Font Size (em)</span>
              <ButtonGroup className="kb-measure-responsive-options" aria-label="Device">
                <Button className="kb-responsive-btn kb-desk-tab is-active is-small">
								<span
								onClick={() =>
									handleDesktopBtnClick({
										setAttributes,
										setPreviewDeviceType:
											dispatch("core/edit-post")
												.__experimentalSetPreviewDeviceType,
									})
								}
								className={`typoResButton dashicons dashicons-desktop ${
									previewmode === "Desktop" ? "active" : " "
								}`}></span>
                </Button>
                <Button className="kb-responsive-btn kb-tablet-tab is-small">
								<span
									onClick={() =>
										handleTabBtnClick({
											setAttributes,
											setPreviewDeviceType:
												dispatch("core/edit-post")
													.__experimentalSetPreviewDeviceType,
										})
									}
									className={`typoResButton dashicons dashicons-tablet ${
										previewmode === "Tablet" ? "active" : " "
									}`}></span>
                </Button>
                <Button className="kb-responsive-btn kb-mobile-tab is-small">
								<span
									onClick={() =>
										handleMobileBtnClick({
											setAttributes,
											setPreviewDeviceType:
												dispatch("core/edit-post")
													.__experimentalSetPreviewDeviceType,
										})
									}
									className={`typoResButton dashicons dashicons-smartphone ${
										previewmode === "Mobile" ? "active" : " "
									}`}></span>
                </Button>
              </ButtonGroup>
            </div>
					<PanelRow>
						<BaseControl className="width-100">
							<RangeControl
								label=" "
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
