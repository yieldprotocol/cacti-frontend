import { useContext } from 'react';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import SettingsContext from '@/contexts/SettingsContext';

const SkeletonWrap = (props: SkeletonProps) => {
  const {
    settings: { experimentalUi },
  } = useContext(SettingsContext);
  return experimentalUi ? (
    <Skeleton {...props} baseColor="#ffffff01" highlightColor="#00808050" /> //rgba(139, 0, 0, 0.5)
  ) : (
    <Skeleton {...props} baseColor="#4b5563" highlightColor="#6b7280" />
  );
};

export default SkeletonWrap;
