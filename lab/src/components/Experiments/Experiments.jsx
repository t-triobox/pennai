import React from 'react';
import { hashHistory } from 'react-router';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FetchMessage from '../FetchMessage';
import FetchError from '../FetchError';
import ExperimentFilters from './components/ExperimentFilters';
import ExperimentsTable from './components/ExperimentsTable';
import { Segment } from 'semantic-ui-react';

function Experiments({
  experiments,
  isFetching,
  errorMessage,
  filters,
  sort,
  location,
  fetchExperiments
}) {
  const updateQuery = (key, value) => {
    const nextLocation = Object.assign({}, location);
    if(value === 'all') {
      delete nextLocation.query[key];
    } else {
      Object.assign(nextLocation.query, { [key]: value });
    }
    hashHistory.push(nextLocation);
  };

  const resetQuery = () => {
    const nextLocation = Object.assign({}, location);
    Object.keys(nextLocation.query).forEach((key) => {
      delete nextLocation.query[key];
    });
    hashHistory.push(nextLocation);
  };

  if(errorMessage && !experiments.size) {
    return (
      <FetchError 
        message={errorMessage}
        onRetry={() => fetchExperiments()}
      />
    );
  } else if(isFetching && !experiments.size) {
    return (
      <FetchMessage message="Retrieving your experiments..." />
    );
  }

  return (
    <div>
      <Segment inverted attached="top">
        <ExperimentFilters
          filters={filters}
          resultCount={experiments.size}
          updateQuery={updateQuery}
          resetQuery={resetQuery}
        />
      </Segment>
      <Segment inverted attached="bottom">
        {experiments.size > 0 ? (
          <ExperimentsTable 
            experiments={experiments}
            filters={filters}
            sort={sort}
            updateQuery={updateQuery}
          />
        ) : (
          <FetchMessage message="No results available." />
        )}
      </Segment>
    </div>
  );
}

Experiments.propTypes = {
  experiments: ImmutablePropTypes.list.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  filters: PropTypes.shape({ 
    algorithm: PropTypes.shape({
      selected: PropTypes.string.isRequired,
      options: PropTypes.array.isRequired
    }),
    dataset: PropTypes.shape({
      selected: PropTypes.string.isRequired,
      options: PropTypes.array.isRequired
    }),
    status: PropTypes.shape({
      selected: PropTypes.string.isRequired,
      options: PropTypes.array.isRequired
    })
  }).isRequired,
  sort: PropTypes.shape({
    column: PropTypes.string,
    direction: PropTypes.string
  }),
  location: PropTypes.object.isRequired,
  fetchExperiments: PropTypes.func.isRequired
};

export default Experiments;