// Description: StepIngredient model
// This model is used to group an ingredient and quantity for use in a recipe step

import {Realm} from '@realm/react';

export class StepIngredient extends Realm.Object {
  constructor(realm, stepIngredientId, ingredient, amount, units, userId) {
    super(realm, {stepIngredientId, ingredient, amount, units, userId: userId || '_SYNC_DISABLED_'});
  }

  // To use a class as a Realm object type in JS, define the object schema on the static property "schema".
  // stepIngredients: {type: 'linkingObjects', objectType: 'StepIngredient', property: 'ingredient'},
  static schema = {
    name: 'StepIngredient',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
      stepIngredientId: 'string',
      ingredient: 'Ingredient',
      amount: 'string?',
      units: 'string?',      
      createdAt: {type: 'date', default: () => new Date()},
      userId: 'string?'
      
    },
  };
}
