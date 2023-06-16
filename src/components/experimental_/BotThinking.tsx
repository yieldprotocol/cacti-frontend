import { ResponseWrap } from '../cactiComponents/helpers/layout';

export const BotThinking = () => {
  return (
    <ResponseWrap>
      <div className="relative h-[24px] overflow-hidden rounded-[6px] ">
        <div className="botLight" />
      </div>
    </ResponseWrap>
  );
};
