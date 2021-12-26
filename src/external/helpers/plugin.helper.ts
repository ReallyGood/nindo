import { pluginService } from '../../internal/services/plugin.service';
import { IPlugin, pluginsList, TPluginState } from '../types';

export const getDefaultPlugin = <T>(data: T, name?: string, status?: TPluginState): IPlugin<T> => ({
	type: pluginService.pluginType,
	guid: null,
	galleryId: null,
	data,
	modelVersion: 1,
	name: name || 'My Plugin',
	description: null,
	previewImage: null,
	privacy: 'public',
	status: status || 'published',
	planFeatures: {},
});
