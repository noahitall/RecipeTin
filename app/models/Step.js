// Description: Step model
// This model is used to describe a step in a recipe, it includes references to a list of step ingredients

import {Realm} from '@realm/react';

export class Step extends Realm.Object {
  constructor(realm, stepId, stepIngredients, lengthInMinutes, description, warning, userId) {
    super(realm, {stepId, stepIngredients, lengthInMinutes, description, warning, userId: userId || '_SYNC_DISABLED_'});
  }

  // constructor(realm, stepId, ingredient, amount, units, userId) {
  //   super(realm, {stepId, ingredient, amount, units, userId: userId || '_SYNC_DISABLED_'});
  // }

  // To use a class as a Realm object type in JS, define the object schema on the static property "schema".
  // 
  static schema = {
    name: 'Step',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
      stepId: 'string',
      stepIngredients: 'StepIngredient[]',
      lengthInMinutes: 'float?',
      description: 'string?',
      warning: 'string?',      
      createdAt: {type: 'date', default: () => new Date()},
      userId: 'string'      
    },
  };
}
