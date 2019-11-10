/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  const resp = await fetch('/graphql', {
    body: JSON.stringify({
      query: `{getEntries(limit:5, page: 0){
        author{
          name,
          picture,
          score
        },
        popularity,
        isTrending,
        date,
        title,
        description,
        numComments,
        thumbnail,
        codeSubmissionTotal,
        pledgeTotal,
        pledgeGoal,
        pledgerCount,
        status}}`,
    }),
  });
  const { data } = await resp.json();

  if (!data || !data.getEntries)
    throw new Error('Failed to load the getEntries feed.');
  return {
    title: 'Nougit Test',
    chunks: ['home'],
    component: (
      <Layout>
        <Home entries={data.getEntries} />
      </Layout>
    ),
  };
}

export default action;
