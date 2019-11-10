/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType,
  GraphQLFloat as FloatType,
} from 'graphql';

const AuthorType = new ObjectType({
  name: 'Author',
  fields: () => ({
    name: { type: StringType },
    picture: { type: StringType },
    score: { type: FloatType },
  }),
});

const EntryItem = new ObjectType({
  name: 'EntryItem',
  fields: {
    author: { type: AuthorType },
    popularity: { type: FloatType },
    isTrending: { type: BooleanType },
    date: { type: StringType },
    title: { type: StringType },
    description: { type: new NonNull(StringType) },
    numComments: { type: IntType },
    thumbnail: { type: StringType },
    codeSubmissionTotal: { type: IntType },
    pledgeTotal: { type: IntType },
    pledgeGoal: { type: IntType },
    pledgerCount: { type: IntType },
    status: { type: IntType },
  },
});

export default EntryItem;
