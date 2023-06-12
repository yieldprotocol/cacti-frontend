import { useEffect, useState } from 'react';
import Image from 'next/image';
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

  return (
    <ResponseWrap>
      <div className="flex items-center justify-between p-2 ">
        <div className="flex items-center space-x-4">
          {project?.logo || props.altImageUrl ? (
            <img className="avatar" src={project.logo || props.altImageUrl} alt="projectLogo" />
          ) : (
            <Avatar actor={'user'} />
          )}
          <div>{props.text}</div>
        </div>
        {(project?.url || props.altUrl) && (
          <div
            className="w-[16px]"
            onClick={() => window.open(project?.url || props.externalUrl, '_blank')}
          >
            <ArrowTopRightOnSquareIcon />
          </div>
        )}
      </div>
    </ResponseWrap>
  );
};
