import { Spinner } from '../../utils';
import { ResponseWrap } from '../cactiComponents/helpers/layout';
import Avatar from '../shared/Avatar';

export const MultiStepProgressIndicator = () => {
  return (
    <div className="grid-gap-2 grid grid-cols-12 py-3">
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
          <div className="flex w-full items-center justify-center gap-2">
            <Spinner className="h-4 w-4 text-white" />
            <div>
              There are more steps in the current workflow, please wait for the next step...
            </div>
          </div>
        </ResponseWrap>
      </div>
    </div>
  );
};
