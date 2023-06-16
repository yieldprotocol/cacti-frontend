import { useEffect, useState } from 'react';
import {
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import { findProjectByName, shortenAddress } from '@/utils';
import projectList from '@/utils/ProjectList.json';
import Avatar from '../Avatar';
import { ResponseWrap } from './helpers/layout';

/**
 * Header Response Elements are indicating with what app, service, or contract a user is about to interact. User have the option to leave the service and open in a new window a direct link to the app or service if they want to interact through their UI rather through our interface.
 * Includes: Text, ProjectId, Image, Button (Go to Service)
 **/
export const HeaderResponse = (props: any) => {
  const [project, setProject] = useState<any>();

  useEffect(() => {
    if (props.projectName) {
      try {
        const project = findProjectByName(props.projectName);
        setProject(project);
      } catch (e) {
        // console.error(e);
        setProject(undefined);
      }
    }

    // if (props.projectName==='user') {
    //   setProject({name: 'user', logo: '/images/user.png', url: 'https://app.cacti.finance/'})
    // }
  }, [props.projectName]);

  const url = project?.url || props.altUrl;

  return url ? (
    <a
      href={url}
      className="group flex w-full cursor-pointer items-center justify-between rounded-md hover:ring-1 hover:ring-gray-700/70"
      target="_blank"
      rel="noreferrer"
    >
      <ResponseWrap>
        <div className="flex w-full justify-between px-1">
          <div className="flex items-center space-x-4">
            {project?.logo || props.altImageUrl ? (
              <img className="avatar" src={project.logo || props.altImageUrl} alt="projectLogo" />
            ) : (
              <Avatar actor={'user'} />
            )}
            <div>{props.text}</div>
          </div>
          <ArrowTopRightOnSquareIcon className="w-5 opacity-0 duration-200 group-hover:opacity-100"  />
        </div>
      </ResponseWrap>
    </a>
  ) : null;
};
