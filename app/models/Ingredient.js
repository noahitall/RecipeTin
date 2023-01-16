// Description: Ingredient model
// This model is used to store a generic description of an ingredient

import {Realm} from '@realm/react';

export class Ingredient extends Realm.Object {
  constructor(realm, name, photoUrl, ingredientId, userId) {
    super(realm, {name, photoUrl, ingredientId, userId: userId || '_SYNC_DISABLED_'});
  }

  // To use a class as a Realm object type in JS, define the object schema on the static property "schema".
  // stepIngredients: {type: 'linkingObjects', objectType: 'StepIngredient', property: 'ingredient'},
  static schema = {
    name: 'Ingredient',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
      ingredientId: 'string',
      name: 'string',
      photoUrl: 'string?',      
      createdAt: {type: 'date', default: () => new Date()},
      userId: 'string'
      
    },
  };
}
