// Container.tsx

import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="px-6 mx-auto max-w-7xl md:px-12 xl:px-6">{children}</div>;
};

export default Container;
