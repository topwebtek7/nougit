/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { GraphQLList as List, GraphQLBoolean, GraphQLInt } from 'graphql';
import EntryItemType from '../types/EntryItemType';
import entriesJson from '../EntriesJson';

const entries = {
  type: new List(EntryItemType),
  args: {
    limit: {
      type: GraphQLInt,
      description:
        'Limits the number of results returned in the page. Defaults to 5.',
    },
    page: {
      type: GraphQLInt,
      description: 'Page ID.',
    },
    isTrending: {
      type: GraphQLBoolean,
      description: "Specify if it's trending or not.",
    },
    status: {
      type: GraphQLInt,
      description: 'Open/Completed task.',
    },
  },
  resolve(root, { limit, page, isTrending, status }) {
    const pgLimit = limit || 5;
    const pageId = page || 0;
    let entriesData = entriesJson;
    if (isTrending !== undefined) {
      entriesData = [...entries.filter(item => item.isTrending === isTrending)];
    }
    if (status !== undefined) {
      entriesData = [...entriesData.filter(item => item.status === status)];
    }
    const res = entriesData.sort((a, b) => {
      if (a.date === b.date) {
        return a.popularity > b.popularity ? 1 : -1;
      }
      return a.date > b.date ? -1 : 1;
    });
    return res.slice(pgLimit * pageId, pgLimit * (pageId + 1));
  },
};

export default entries;
