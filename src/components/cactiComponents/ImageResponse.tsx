import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { navigateToExternalUrl } from '@/utils';
import { ResponseTitle, ResponseWrap } from './helpers/layout';

const TagItem = (props: { tag: string }) => {
  return (
    <span className="boder-white/10 inline-block rounded-full border-[1px] px-3 py-1 text-[0.5em] uppercase">
      {props.tag}
    </span>
  );
};

export enum ImageVariant {
  DEFAULT = 'default',
  SHOWCASE = 'showcase',
  COMPACT = 'compact',
}

type ImageResponseProps = {
  actionLabel?: string;
  actionValue?: string;
  description?: string;
  image?: string;
  imageTags?: string[];
  title?: string;
  imageLink?: string;
  subTitle?: string;

  variant?: ImageVariant;

  children?: React.ReactNode;
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

/**
 * Image response element
 * @param props
 * @returns
 */
export const ImageResponse = (props: ImageResponseProps) => {
  const tagList = props.imageTags || [];
  const variant = props.variant || ImageVariant.DEFAULT;

  return (
    <ResponseWrap>
      {variant === ImageVariant.SHOWCASE && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Image src={props.image} alt={props.title} />
          </div>
          <div>{props.children && <div> {props.children} </div>}</div>
        </div>
      )}

      {variant === ImageVariant.DEFAULT && (
        <div>
          {props.title && ( // if has title
            <ResponseTitle>
              <div className="">
                {props.title}
                <div className="text-xs text-white/50">{props.subTitle}</div>
              </div>

              {props.imageLink && ( // if has external link
                <div onClick={() => navigateToExternalUrl(props.imageLink!)}>
                  <ArrowTopRightOnSquareIcon className="w-[16px] stroke-2 hover:text-white " />
                </div>
              )}
            </ResponseTitle>
          )}

          <Image src={props.image} alt={props.title} />

          {tagList.length > 1 && ( // if has tags
            <div className="space-x-2 space-y-1 py-2 ">
              {tagList.map((tag: string) => (
                <TagItem tag={tag} key={tag} />
              ))}
            </div>
          )}

          {props.description && <div> {props.description} </div>}

          {(props.actionLabel || props.actionValue) && ( // if has actionLbel or actionValue
            <div className="flex justify-between pt-4">
              <div>{props.actionLabel}</div>
              <div>{props.actionValue}</div>
            </div>
          )}
        </div>
      )}

      {variant === ImageVariant.COMPACT && (
        <div className="group relative h-full w-full">
          <div className="fixed">
            <Image src={props.image} alt={props.title} />
          </div>
          <div className="absolute text-xs text-white/50 group-hover:text-white ">somehting</div>
        </div>
      )}
    </ResponseWrap>
  );
};
