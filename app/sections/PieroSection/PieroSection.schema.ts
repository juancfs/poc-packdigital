import { containerSettings } from '~/settings/container';

export const Schema = () => {
  return {
    category: 'Custom Sections',
    label: 'PieroSection',
    key: 'piero-section',
    previewSrc:
      'https://cdn.shopify.com/s/files/1/0671/5074/1778/files/hero-preview_2cd7154c-7ec6-4846-84ca-85aaef836165.jpg?v=1675795229',
    fields: [containerSettings()],
  };
};
