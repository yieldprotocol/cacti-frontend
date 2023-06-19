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

export type ImageResponseProps = {
  actionLabel?: string;
  actionValue?: string;
  description?: string;
  image: string;
  imageTags?: string[];
  title?: string;
  imageLink?: string;
  subTitle?: string;
};

/**
 * Image response element
 * @param props
 * @returns
 */
export const ImageResponse = (props: ImageResponseProps) => {
  const tagList = props.imageTags || [];

  return (
    <ResponseWrap classNameExtra="w-full">
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

      <div className="max-w-sm gap-2 space-y-2 overflow-hidden rounded-xl bg-white bg-opacity-5 p-2 ">
        {props.image ? (
          <img className="w-full" src={props.image} alt={props.title} />
        ) : (
          <div className="w-full items-center justify-center rounded-lg bg-gray-100 text-4xl text-gray-400">
            ?
          </div>
        )}
      </div>

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
    </ResponseWrap>
  );
};
