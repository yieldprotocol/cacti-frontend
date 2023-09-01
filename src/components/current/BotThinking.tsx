
import { ResponseWrap } from '../cactiComponents/helpers/layout';
import Avatar from '../shared/Avatar';

export const BotThinking = () => {
  return (
    <div className="grid-gap-2 mb-8 grid grid-cols-12 py-3">
      <div className="col-span-2 py-4">
        <div className="float-right">
          <Avatar actor="bot" />
        </div>
      </div>

      <div
        className="col-span-8 flex 
          h-full w-full flex-col 
          gap-2 
          px-4 
          text-white/70
          "
      >
        <ResponseWrap>
          <div className="relative h-[16px] overflow-hidden rounded-[6px] ">
            <div className="botLight" />
          </div>
        </ResponseWrap>
      </div>
    </div>
  );
};
