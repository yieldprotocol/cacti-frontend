import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  DocumentDuplicateIcon,
  LinkIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import copy from 'copy-to-clipboard';
import { useChatContext } from '@/contexts/ChatContext';
import useThread from '@/hooks/useThread';
import { Spinner } from '@/utils';

const ShareChatModal = ({ id }: { id: string | undefined }) => {
  const { threadName } = useThread(id);
  const { showShareModal: isOpen, setShowShareModal, shareChat } = useChatContext();

  const [newThreadId, setNewThreadId] = useState<string>();
  const [newThreadUrl, setNewThreadUrl] = useState<string>();

  const [isSharing, setIsSharing] = useState<boolean>(false);

  /* Reset newThreadID whenever the id changes */
  useEffect(() => {
    setNewThreadId(undefined);
  }, [id]);

  const handleShareChat = async () => {
    setIsSharing(true);

    try {
      /* Wait 2 seconds to show the spinner */
      await new Promise((resolve) => setTimeout(resolve, 2000));

      /* Share the chat and get the new thread id */
      const newId = await shareChat(id!);
      setNewThreadId(newId!);
      setNewThreadUrl(`${window.location.origin}/chat/${newId}`);

      /* Copy the url to the clipboard */
      copy(newThreadUrl!);

      /* If the thread has a name - rename the share to the same name */
      threadName !== id && handleEditName(threadName!);
    } catch (error) {
      console.log('Sharing Error: ', error);
    }
    setIsSharing(false);
  };

  const handleEditName = (newName: string) => {};

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setShowShareModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h2" className="text-lg font-bold leading-6 text-gray-900">
                    Share chat
                  </Dialog.Title>

                  <div className="mt-2 space-y-4 py-4 ">
                    <p className="text-sm text-gray-500">
                      Sharing this chat will create a link to a new chat with the same messages. By
                      default the new chat will be uneditable.
                    </p>

                    {/* <div className="flex items-center gap-2">
                      {threadName !== threadId ? (
                        threadName
                      ) : (
                        <div className="font-thin text-slate-600 text-sm"> Use default name</div>
                      )}
                      <div className="h-4 w-4">
                        <PencilIcon />
                      </div>
                    </div> */}
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className=" w-full cursor-pointer select-none rounded-[8px] bg-teal-900 p-[8px] text-center text-white transition ease-in-out active:bg-transparent"
                      onClick={() => handleShareChat()}
                    >
                      <div className="flex items-center justify-center gap-2 ">
                        <div className="h-4 w-4">
                          {isSharing ? (
                            <Spinner />
                          ) : newThreadId ? (
                            <CheckCircleIcon />
                          ) : (
                            <DocumentDuplicateIcon />
                          )}
                        </div>
                        <div className="text-sm">
                          {!newThreadId ? 'Share and Copy link' : 'Create a New Share'}
                        </div>
                      </div>
                    </button>

                    {newThreadId ? (
                      <div className=" mt-10 space-y-2 text-sm text-gray-600">
                        <div className="flex gap-4">
                          Url: {newThreadUrl}
                          <div className="h-4 w-4" onClick={() => copy(newThreadUrl!)}>
                            <DocumentDuplicateIcon />
                          </div>
                        </div>

                        <div className="  flex gap-4 text-sm text-gray-500">
                          Name: {newThreadId}
                          <div className="h-4 w-4">
                            <PencilIcon />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-10 text-sm text-gray-500" />
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ShareChatModal;