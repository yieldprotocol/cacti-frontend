import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { navigateToExternalUrl } from '@/utils';
import { ResponseTitle, ResponseWrap } from './helpers/layout';

export enum ImageVariant {
  DEFAULT = 'default',
  SHOWCASE = 'showcase',
  COMPACT = 'compact',
}
/**
 * ImageResponse
 * @param image - image url
 * @param imageTags - list of tags
 * @param title - title
 * @param subTitle - subtitle
 * @param imageLink - external link
 * @param description - description
 * @param variant - variant
 * @param children - children
 *
 */
export interface ImageResponseProps {
  image?: string;
  imageTags?: string[];
  title?: string;
  subTitle?: string;
  imageLink?: string;
  description?: string;
  variant?: ImageVariant;
  children?: React.ReactNode;
}

const TagItem = (props: { tag: string }) => {
  return (
    <span className="boder-white/10 inline-block rounded-full border-[1px] px-3 py-1 text-[0.5em] uppercase">
      {props.tag}
    </span>
  );
};

const Image = (props: { src?: string; alt?: string }) => {
  return (
    <div className="max-w-[250px] gap-2 space-y-2 overflow-hidden rounded-xl bg-white bg-opacity-5 p-2  ">
      {props.src ? (
        <img className="w-full rounded-xl" src={props.src} alt={props.alt} />
      ) : (
        <div className="flex min-h-[200px] items-center justify-center rounded-xl bg-white bg-opacity-10 text-4xl text-gray-200">
          <div>?</div>
        </div>
      )}
    </div>
  );
};

export const ImageResponse = ({
  image,
  imageLink,
  imageTags,
  variant,
  title,
  subTitle,
  description,
  children,
}: ImageResponseProps) => {
  const tagList = imageTags || [];
  const variant_ = variant || ImageVariant.DEFAULT;

  const Title = () => (
    <ResponseTitle>
      <div>
        {title}
        <div className="text-xs text-white/50">{subTitle}</div>
      </div>

      {imageLink && ( // if has external link
        <div onClick={() => navigateToExternalUrl(imageLink!)}>
          <ArrowTopRightOnSquareIcon className="w-[16px] stroke-2 hover:text-white " />
        </div>
      )}
    </ResponseTitle>
  );

  return (
    <ResponseWrap>
      {variant_ === ImageVariant.SHOWCASE && ( // Showcase Item (horizontal orientation)
        <div className="flex gap-4">
          <div className="flex min-w-fit flex-shrink">
            <Image src={image} alt={title} />
          </div>
          <div className="flex flex-grow flex-col justify-between">
            {title && <Title />}
            {description && <div> {description} </div>}
            {children && <div> {children} </div>}
            {tagList.length > 0 && ( // if has tags
              <div className="space-x-2 space-y-1 py-2 ">
                {tagList.map((tag: string) => (
                  <TagItem tag={tag} key={tag} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {variant_ === ImageVariant.DEFAULT && ( // default Image (vertical orientation)
        <div>
          {title && ( // if has title
            <Title />
          )}
          <Image src={image} alt={title} />
          {tagList.length > 0 && ( // if has tags
            <div className="space-x-2 space-y-1 py-2 ">
              {tagList.map((tag: string) => (
                <TagItem tag={tag} key={tag} />
              ))}
            </div>
          )}
          {description && <div> {description} </div>}
          {children && <div> {children} </div>}
        </div>
      )}

      {variant_ === ImageVariant.COMPACT && ( // simply just the image, with overlay on hover
        <div className="group relative h-full w-full">
          <div className="fixed">
            <Image src={image} alt={title} />
          </div>
          <div className="absolute text-xs text-white/50 group-hover:text-white ">somehting</div>
        </div>
      )}
    </ResponseWrap>
  );
};

export default ImageResponse;
