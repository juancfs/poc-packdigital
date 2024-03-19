import {Container, Image} from '~/components';

import {BannerContainer} from './BannerTwoContainer';
import {BannerContent} from './BannerTwoContent';
import type {BannerCms} from './Banner.types';
import {Schema} from './BannerTwo.schema';

export function BannerTwo({cms}: {cms: BannerCms}) {
  const {content, image, section, text} = cms;

  return (
    <Container container={cms.container}>
      <BannerContainer cms={cms}>
        <div className="absolute inset-0 h-full w-full overflow-hidden md:hidden">
          {image?.imageMobile?.src && (
            <Image
              data={{
                altText: image.alt,
                url: image.imageMobile.src,
                width: image.imageMobile.width,
                height: image.imageMobile.height,
              }}
              className={`media-fill ${image.positionMobile}`}
              loading="eager"
              sizes="100vw"
            />
          )}
        </div>

        <div className="absolute inset-0 hidden h-full w-full overflow-hidden md:block">
          {image?.imageDesktop?.src && (
            <Image
              data={{
                altText: image.alt,
                url: image.imageDesktop.src,
                width: image.imageDesktop.width,
                height: image.imageDesktop.height,
              }}
              className={`media-fill ${image.positionDesktop}`}
              loading="eager"
              sizes="100vw"
            />
          )}
        </div>

        <BannerContent
          aboveTheFold={section?.aboveTheFold}
          content={content}
          text={text}
        />
      </BannerContainer>
    </Container>
  );
}

BannerTwo.displayName = 'Banner';
BannerTwo.Schema = Schema;