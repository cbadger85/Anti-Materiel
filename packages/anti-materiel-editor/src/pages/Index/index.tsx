import React, { useState } from 'react';
import { SinglePaneLayout } from '../../components/Layouts/SinglePaneLayout';
import { Toggle } from '../../components/Toggle/Toggle';

export const Index: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  return <SinglePaneLayout title="Editor" mainContent={() => null} />;
};
