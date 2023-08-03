import { Spinner } from '../../utils';
import Avatar from '../Avatar';
import { ResponseWrap } from '../cactiComponents/helpers/layout';

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
          <div className="cen flex w-full justify-center">
            <Spinner className="h-4 w-4 text-white" />
            <div>
              There are more steps in the current workflow, please wait as the system computes the
              next step.
            </div>
          </div>
        </ResponseWrap>
      </div>
    </div>
  );
};
