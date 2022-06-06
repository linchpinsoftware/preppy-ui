import Dashboard from './Dashboard';
import PreppyCamera from './Camera';
import React from 'react';
import UserLogin from './UserLogin';
import UserProfile from './UserProfile';
import FactParser from './FactParser';

export default function App() {
  // @todo complete
  const userIsAuthenticated = () => true;

  // @todo complete
  const userProfileIsComplete = () => true;

  // @todo on load: pause for 1 sec(?) before loading main menu
  // @todo dashboard: food, water, and fuel for x days; water is LCDs

  return <FactParser />;

  return <PreppyCamera />;

  if (!userIsAuthenticated()) {
    return <UserLogin />;
  }

  if (!userProfileIsComplete()) {
    return <UserProfile incomplete={true} />;
  }

  return <Dashboard />;
}
