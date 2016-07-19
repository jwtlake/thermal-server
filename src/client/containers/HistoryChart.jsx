import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import HistoryChart from '../components/HistoryChart';

const mapStateToProps = (state) => {
  return {
    sensors: state.get('sensors'),
    readings: state.get('readings')
  };
}

const mapDispatchToProps = (dispatch) => {
  //not used	
  return {
    getHistory: (id) => {
      console.log('Get History for ID ' + id)
    }
  }
}

class HistoryChartContainer extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {   
    const {
      props: { sensors, readings }
    } = this;

    return ( <HistoryChart key='all' sensors={sensors} readings={readings} />);
  }
};

HistoryChartContainer.propTypes = {
  sensors: ImmutablePropTypes.list.isRequired,
  readings: ImmutablePropTypes.map.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryChartContainer);
