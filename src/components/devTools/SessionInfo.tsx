import { shortenAddress } from '@/utils';
import { useSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';

export const SessionInfo = () => {
  const {  status } = useSession();
  
  return ( 
    <div>
      {/* { data?.user && <div  className='text-sm text-left'> user: {shortenAddress(user?.name || '')}</div> } */}
      <div className='text-sm text-left'> Auth status:  { status } </div>
      {/* <div className='text-sm text-left'> token: </div> */}
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async context => {
//   const session = await getSession(context);
//   const token = await getToken({ req: context.req });
//   const address = token?.sub ?? null;
//   // If you have a value for "address" here, your
//   // server knows the user is authenticated.
//   // You can then pass any data you want
//   // to the page component here.
//   return {
//     props: {
//       address,
//       session,
//     },
//   };
// };

// type AuthenticatedPageProps = InferGetServerSidePropsType<
//   typeof getServerSideProps
// >;

// const AuthenticatedAddress = ({
//   address,
// }: AuthenticatedPageProps) => {
//   return address
// }