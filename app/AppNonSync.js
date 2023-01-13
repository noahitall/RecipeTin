import React, { useMemo } from "react";

import { Task } from "./models/Task";
import { Category } from "./models/Category";
import { TaskRealmContext, CategoryRealmContext } from "./models";
import { TaskManager } from "./components/TaskManager";
import AppContainer from './navigations/AppNavigation';



const { useQuery } = TaskRealmContext;
import Realm from "realm";


export const AppNonSync = () => {
 
  const result = useQuery(Task);
  const tasks = useMemo(() => result.sorted("createdAt"), [result]);
  
  const resultCat = useQuery(Category);
  const categories = useMemo(() => resultCat.sorted("createdAt"), [resultCat]);
  
  //return the Navigation component
  return <AppContainer />
  
  //return <TaskManager tasks={tasks} categories={categories} />;
};
