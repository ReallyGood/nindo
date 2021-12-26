import React, { ComponentType, ReactElement } from 'react';
import loadable from '@loadable/component';
import { useRouteMatch } from 'react-router-dom';
import { IEditorConfig, TActivePage, TSiteBuilderVendor } from '../../../external/types/editor.types';
import { PluginWrapper } from '../pluginWrapper/pluginWrapper.comp';
import { Loader } from '../../../external/components/loader/loader.comp';
import { IAppMenuLink, IEditorExtraProps, IPlugin, IPluginComp, IPluginLoaderComp } from '../../../external/types';

import './editor.scss';

const CNEditor = loadable(
	() => import('../cnEditor/cnEditor.comp'),
	{
		resolveComponent: (module) => module['CNEditor'],
		fallback: <Loader />,
	}
);

interface IConfigParts {
	menuItems: IAppMenuLink[];
	pageToComp: (activePage: TActivePage) => {
		comp: ComponentType<any> | ReactElement,
		context: 'menu' | 'main'
	}
}

export interface IEditorProps<T> extends IEditorExtraProps<T> {
	config: IEditorConfig<T>;
	pluginComp: IPluginComp<T>;
	defaultPluginData: IPlugin<T>;
	pluginLoaderComp?: IPluginLoaderComp;
}

export const Editor = ({ config, pluginComp, pluginLoaderComp, defaultPluginData, ...restProps }: IEditorProps<any>) => {
	const match = useRouteMatch();
	const { vendor } = match.params as {
		vendor: TSiteBuilderVendor;
	};

	const { menuItems, pageToComp } = mapConfigToPats(config);

	return (
		<CNEditor
			menuLinks={menuItems}
			resolveContextComp={pageToComp}
			defaultPluginData={defaultPluginData}
			pluginComp={<PluginWrapper mode={'editor'} pluginComp={pluginComp} vendor={vendor} />}
			pluginLoaderComp={pluginLoaderComp}
			showAnnouncements={true}
			showHistoryButtons={true}
			vendor={vendor}
			{...restProps || {}}
		/>
	);
};

function mapConfigToPats(config: IEditorConfig<any>): IConfigParts {
	const pagesMap = config.sections.reduce((map, { id, component, context }) => {
		map.set(id, { 
			comp: component, 
			context: context || 'menu' 
		});
		return map;
	}, new Map<TActivePage, {
		comp: ComponentType<any> | ReactElement,
		context: 'menu' | 'main'
	}>());

	return {
		menuItems: config.sections as any[],
		pageToComp: (activePage: TActivePage) => {
			return pagesMap.get(activePage)!;
		},
	};
}
