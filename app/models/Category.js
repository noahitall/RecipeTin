// This JS version of the Category model shows how to create Realm objects by
// defining a schema on the class, which is required if your project does not
// use TypeScript. If you are using TypeScript, we recommend using
// `@realm/babel-plugin` (https://github.com/realm/realm-js/blob/master/packages/babel-plugin/),
// which allows you to define your models using TypeScript syntax.
//

import {Realm} from '@realm/react';

export class Category extends Realm.Object {
  constructor(realm, name, photoUrl, categoryId, userId) {
    super(realm, {name, photoUrl, categoryId, userId: userId || '_SYNC_DISABLED_'});
  }

  // To use a class as a Realm object type in JS, define the object schema on the static property "schema".
  static schema = {
    name: 'Category',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
      categoryId: 'string',
      name: 'string',
      photoUrl: 'string?',
      isVisible: {type: 'bool', default: true},
      createdAt: {type: 'date', default: () => new Date()},
      userId: 'string',
      recipes: {type: 'linkingObjects', objectType: 'Recipe', property: 'category'},
    },
  };
}
