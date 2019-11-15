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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faShare,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import s from './SingleTask.css';

class SingleTask extends React.Component {
  static propTypes = {
    task: PropTypes.any.isRequired,
  };

  render() {
    const { task } = this.props;
    return (
      <article className={s.taskItem}>
        <div className={s.taskContent}>
          <div className={s.floatingDiv}>
            {task.isTrending && <div className={s.trending}>Trending</div>}
            {task.status === 0 && (
              <div className={s.completed}>Task Completed</div>
            )}
          </div>
          <div className={s.authorContainer}>
            <div className={s.profile}>
              <img
                className={s.profileImage}
                src={task.author.picture}
                alt="profile"
              />
            </div>
            <div className={s.name}>{task.author.name}</div>
          </div>
          <div className={s.taskTitle}>{task.title}</div>
          <div className={s.taskDesc}>{task.description}</div>
          <div className={s.pledgeThumbnailContainer}>
            <div className={s.thumbLayoutContainer}>
              <div className={s.thumbnail}>
                <img
                  className={s.thumbnailImg}
                  src={task.thumbnail}
                  alt="thumbnail"
                />
              </div>
              <div className={s.pledgeContainer}>
                <div className={s.pledgeTotal}>${task.pledgeTotal}</div>
                <div className={s.pledgeGoal}>
                  pledged of ${task.pledgeGoal} goal
                </div>
                <div className={s.pledgeCount}>{task.pledgerCount}</div>
                <div className={s.pledgeTxt}>pledgers</div>
              </div>
            </div>
            <div className={s.submissionContainer}>
              Code Submissions ({task.codeSubmissionTotal})
            </div>
          </div>
        </div>
        <div className={s.commentContainer}>
          <div className={s.icon}>
            <FontAwesomeIcon icon={faComments} />
            Comments ({task.numComments})
          </div>
          <div className={s.shareBtn}>
            <FontAwesomeIcon icon={faShare} />
            Share
          </div>
          <div className={s.ellipsisBtn}>
            <FontAwesomeIcon icon={faEllipsisH} />
          </div>
        </div>
      </article>
    );
  }
}

export default withStyles(s)(SingleTask);
