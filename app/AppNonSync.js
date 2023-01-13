import React, { useMemo } from "react";

import { Task } from "./models/Task";
import { Category } from "./models/Category";
import { TaskRealmContext, CategoryRealmContext } from "./models";
import { TaskManager } from "./components/TaskManager";
import AppContainer from './navigations/AppNavigation';



const { useQuery } = TaskRealmContext;


export const AppNonSync = () => {
  const result = useQuery(Task);
  const resultCat = useQuery(Category);
    
  const tasks = useMemo(() => result.sorted("createdAt"), [result]);
  const categories = useMemo(() => resultCat.sorted("createdAt"), [resultCat]);
  
  //return the Navigation component
  return <AppContainer />
  
  //return <TaskManager tasks={tasks} categories={categories} />;
};
