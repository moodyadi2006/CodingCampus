/* eslint-disable @typescript-eslint/no-empty-object-type */
import TopbarStudent from '@/components/Topbar/TopbarStudent';
import TopbarCompany from '@/components/Topbar/TopbarCompany';
import Workspace from '@/components/Workspace/Workspace';
import useHasMounted from '@/hooks/useHasMounted';
import { problems } from '@/utils/problems';
import { Problem } from '@/utils/types/problem';
import React from 'react';
import { useUser } from '../context/UserContext'; // Assuming you have a UserContext to get user information

type ProblemPageProps = {
  problem: Problem;
};

const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {
  const hasMounted = useHasMounted();
  const { user } = useUser(); // Get the user from context

  if (!hasMounted) return null;

  return (
    <div>
      {user?.role === 'company' ? (
        <TopbarCompany problemPage={true} />
      ) : (
        <TopbarStudent problemPage={true} />
      )}
      <Workspace problem={problem} />
    </div>
  );
};

export default ProblemPage;

// fetch the local data
// SSG- static site generation
// It is done with the help of two functions
// getStaticPaths => it creates the dynamic routes

export async function getStaticPaths() {
  const paths = Object.keys(problems).map((key) => ({
    params: { pid: key }
  }));
  return {
    paths: paths,
    fallback: false // It means if we try to access any url which is not generated it gives an error
  };
}

// getStaticProps => it fetches the data

export async function getStaticProps({ params }: { params: { pid: string } }) {
  const { pid } = params;
  const problem = problems[pid];

  if (!problem) {
    return {
      notFound: true
    };
  }
  problem.handlerFunction = problem.handlerFunction.toString();
  return {
    props: {
      problem
    }
  };
}
