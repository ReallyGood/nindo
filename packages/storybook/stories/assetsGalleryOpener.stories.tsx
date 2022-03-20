import React, { useState } from 'react';
import dedent from 'ts-dedent';
import { AssetsGalleryOpener } from '../../nindo/src/external/components/assetsGalleryOpener';
import { FormRow } from '../../nindo/src/external/components/formRow';
import { ComponentStory, storiesOf } from '@storybook/react';
import { ProviderWrapper, store } from './provider';


// export default {
//   title: 'Editor/Assets Gallery',
//   component: AssetsGalleryOpener,
//   parameters: {
//     docs: {
//       description: {
//         component: dedent(
//           `
//           The \`<AssetsGalleryOpener />\` allows you to open the Common Ninja assets gallery where users may upload, delete, and find images they added to their apps.
//           `
//         ),
//       },
//     },
//   },
// };

// const Template: ComponentStory<typeof AssetsGalleryOpener> = (args) => {
//   const [url, setUrl] = useState('');

//   return (
//     <FormRow>
//       <label>Image URL</label>
//       <AssetsGalleryOpener
//         {...args}
//         submitCallback={(url) => setUrl(url)}
//         enabled={true}
//         disabledCallback={() => alert('hey')}
//       />
//       <input
//         type="url"
//         placeholder="Enter image URL"
//         value={url}
//         onChange={(e: any) => setUrl(e.target.value)}
//       />
//     </FormRow>
//   );
// };


// export const assetsGallery = Template.bind({});
// assetsGallery.args = {
//   enabled: true,
//   submitCallback: (url) => alert(url),
// }

storiesOf('Editor/Assets Gallery', module)
  .addDecorator(story => <ProviderWrapper >{story()}</ProviderWrapper>)
  .add('Assets Gallery', (args: any) => {
    const [url, setUrl] = useState('');
    return (
      <FormRow>
        <label>Image URL</label>
        <AssetsGalleryOpener
          {...args}
          submitCallback={(url) => setUrl(url)}
          enabled={true}
          disabledCallback={() => alert('hey')}
        />
        <input
          type="url"
          placeholder="Enter image URL"
          value={url}
          onChange={(e: any) => setUrl(e.target.value)}
        />
      </FormRow>
    )
  }
  );