/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/withStyles';
import debounce from 'lodash.debounce';
import s from './Home.css';
import SingleTask from './SingleTask';

class Home extends React.Component {
  static propTypes = {
    entries: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      entries: props.entries,
      limit: 5,
      page: 0,
      isTrending: undefined,
      status: undefined,
      hasMore: true,
    };

    window.onscroll = debounce(() => {
      const {
        state: { hasMore },
      } = this;
      if (!hasMore) return;
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        this.fetchEntries(false, true);
      }
    }, 100);
  }

  fetchEntries = async (refresh = false, isNextPage = false) => {
    const { limit, page, isTrending, status, entries } = this.state;
    const resp = await fetch('/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query: `{getEntries(${limit ? `limit:${limit}` : 'limit: 5'}${
          page !== undefined
            ? `, page:${isNextPage ? page + 1 : page}`
            : 'page: 0'
        }${isTrending !== undefined ? `,isTrending:${isTrending}` : ''}${
          status !== undefined ? `, status:${status}` : ''
        }){
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
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { data } = await resp.json();
    if (data.getEntries) {
      if (refresh) {
        this.setState({
          entries: data.getEntries,
          hasMore: data.getEntries.length > 0,
        });
      } else {
        this.setState({
          entries: [...entries, ...data.getEntries],
          hasMore: data.getEntries.length > 0,
          page: isNextPage ? page + 1 : page,
        });
      }
    }
  };

  filter(filterValue) {
    let isTrending;
    let status;
    switch (filterValue) {
      case 'all':
        break;
      case 'trending':
        isTrending = !this.state.isTrending;
        break;
      case 'open':
        status = this.state.status ? undefined : 1;
        break;
      case 'completed':
        status =
          !this.state.status && this.state.status !== undefined ? undefined : 0;
        break;
      default:
        break;
    }
    this.setState({ isTrending, status, page: 0 }, () => {
      this.fetchEntries(true);
    });
  }

  render() {
    const { entries, isTrending, status } = this.state;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.btnContainer}>
            <span>Filter by:</span>
            <button
              type="button"
              className={!isTrending && status === undefined ? s.activeBtn : ''}
              onClick={() => this.filter('all')}
            >
              All
            </button>
            <button
              type="button"
              className={isTrending ? s.activeBtn : ''}
              onClick={() => this.filter('trending')}
            >
              Trending
            </button>
            <button
              type="button"
              className={status ? s.activeBtn : ''}
              onClick={() => this.filter('open')}
            >
              Open Tasks
            </button>
            <button
              type="button"
              className={status === 0 ? s.activeBtn : ''}
              onClick={() => this.filter('completed')}
            >
              Completed Tasks
            </button>
          </div>
          {entries &&
            entries.map(item => (
              <SingleTask
                task={item}
                key={`${item.author.name}_${item.title}`}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
