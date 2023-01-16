// This JS version of the Recipe model shows how to create Realm objects by
// defining a schema on the class, which is required if your project does not
// use TypeScript. If you are using TypeScript, we recommend using
// `@realm/babel-plugin` (https://github.com/realm/realm-js/blob/master/packages/babel-plugin/),
// which allows you to define your models using TypeScript syntax.
//

import {Realm} from '@realm/react';

export class Recipe extends Realm.Object {
  constructor(realm, userId,submittedByUserId, recipeId, categoryId, title, photo_url, 
    photosArray, time, total_length_in_minutes, active_length_in_minutes, materials,  stepIngredients, steps, description, servingsMade, category) {
    super(realm, {recipeId, categoryId, title, photo_url, 
      photosArray, time, total_length_in_minutes, active_length_in_minutes, materials,  stepIngredients, steps, description, servingsMade, category, userId: userId || '_SYNC_DISABLED_', submittedByUserId: submittedByUserId || '_SYNC_DISABLED_', });
  }

  // To use a class as a Realm object type in JS, define the object schema on the static property "schema".
  static schema = {
    name: 'Recipe',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
      createdAt: {type: 'date', default: () => new Date()},      
      userId: 'string',    
      submittedByUserId: 'string',    
      recipeId: 'string',
      categoryId: 'string',
      category: "Category?",
      title: 'string',
      photo_url: 'string?',
      photosArray: 'string[]',
      time: 'string',
      total_length_in_minutes: 'double',
      active_length_in_minutes: 'double',
      servingsMade: 'string',
      materials: 'string[]',      
      stepIngredients: 'string[]',
      steps: 'Step[]',
      description: 'string?',                  
    },
  };
}


