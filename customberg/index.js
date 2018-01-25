/**
 * External dependencies
 */
import { connect, createProvider } from 'react-redux';

/**
 * WordPress dependencies
 */
import { render } from '@wordpress/element';
import { IconButton, Popover } from '@wordpress/components';
import {
	BlockList,
	EditorHistoryRedo,
	EditorHistoryUndo,
	EditorNotices,
	EditorProvider,
	Inserter,
	MultiBlocksSwitcher,
	NavigableToolbar,
	PostTitle,
	PostPreviewButton,
	PostSavedState,
	PostPublishPanelToggle,
} from '@wordpress/editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import createReduxStore from './store';

export function createTemplateEditorInstance( id, post, settings ) {
	const target = document.getElementById( id );
	const store = createReduxStore();

	// FIXME Should just be `ReduxProvider`
	const TemplateProvider = createProvider( 'templateEditorStore' );

	render(
		<EditorProvider settings={ settings } post={ post }>
			<TemplateProvider store={ store }>
				<Layout />
			</TemplateProvider>
		</EditorProvider>,
		target
	);
}

const applyConnect = connect(
	( state ) => ( {
		// …
	} ),
	undefined,
	undefined,
	// Temporary:
	{ storeKey: 'templateEditorStore' }
);

const Layout = applyConnect( () => (
	<div className="editor-layout">
		{ /*<UnsavedChangesWarning /> */ }
		<Header />
		<div className="editor-layout__content" role="region" aria-label={ __( 'Editor content' ) } tabIndex="-1">
			<EditorNotices />
			<div className="editor-layout__editor">
				<div className="editor-visual-editor">
					<PostTitle />
					<BlockList showContextualToolbar={ true } />
				</div>
			</div>
		</div>
		<Popover.Slot />
	</div>
) );

function Header() {
	return (
		<div
			role="region"
			aria-label={ __( 'Editor toolbar' ) }
			className="editor-header"
			tabIndex="-1"
		>
			<NavigableToolbar
				className="editor-header-toolbar"
				aria-label={ __( 'Editor Toolbar' ) }
			>
				<Inserter position="bottom right" />
				<EditorHistoryUndo />
				<EditorHistoryRedo />
				<MultiBlocksSwitcher />
			</NavigableToolbar>
			<div className="editor-header__settings">
				<TemplateSavedState />
				<TemplatePreviewButton />
				<PostPublishPanelToggle
				/>
				<IconButton
					icon="admin-generic"
					label={ __( 'Settings' ) }
				/>
			</div>
		</div>
	);
}

function TemplateSavedState() {
	return null;
}
function TemplatePreviewButton() {
	return <PostPreviewButton />;
}

createTemplateEditorInstance(
	'editor',
	{
		content: { raw: '', rendered: '' },
		title: { raw: '', rendered: '' },
		type: 'wp-template',
	}
);

//{id: 1176, date: "2018-01-02T16:02:57", date_gmt: "2018-01-02T16:02:57", guid: {…}, modified: "2018-01-20T12:35:59", …}author: 1categories: [1]comment_status: "closed"content: {raw: "<!-- wp:core/paragraph -->↵<p>Illo dolor reiciendi…que ea iusto qui.</p>↵<!-- /wp:core/paragraph -->", rendered: "↵<p>Illo dolor reiciendis <a href="http://localhos…sectetur commodi ducimus neque ea iusto qui.</p>↵", protected: false}date: "2018-01-02T16:02:57"date_gmt: "2018-01-02T16:02:57"excerpt: {raw: "", rendered: "<p>Illo dolor reiciendis quaerat voluptate laborio…io ab. Ipsa sit sed reprehenderit [&hellip;]</p>↵", protected: false}featured_media: 0format: "standard"guid: {rendered: "http://localhost:8000/?p=1176", raw: "http://localhost:8000/?p=1176"}id: 1176link: "http://localhost:8000/?p=1176"meta: []modified: "2018-01-20T12:35:59"modified_gmt: "2018-01-20T12:35:59"password: ""ping_status: "closed"revisions: {count: 149, last_id: 1507}slug: "texo"status: "draft"sticky: falsetags: []template: ""title: {raw: "Texō", rendered: "Texō"}type: "post"_links: {self: Array(1), collection: Array(1), about: Array(1), author: Array(1), replies: Array(1), …}__proto__: Object
