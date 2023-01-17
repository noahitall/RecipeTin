import React from "react";

import AppContainer from './navigations/AppNavigation';


export const AppNonSync = () => {
 
  // const result = useQuery(Task);
  // const tasks = useMemo(() => result.sorted("createdAt"), [result]);
  
  
  //return the Navigation component
  return <AppContainer />
  
  //return <TaskManager tasks={tasks} categories={categories} />;
};
