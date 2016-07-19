import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import SensorCard from '../components/SensorCard';

const mapStateToProps = (state) => {
  return {
    sensors: state.get('sensors'),
    readings: state.get('readings')
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHistory: (id) => {
      console.log('Get History for ID ' + id)
    }
  }
}

class SensorCardList extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {   
    const {
      props: { sensors }
    } = this;
    
    return (
      <div>
        {sensors.map(sensor => {
		return(<SensorCard 
	            key={sensor.get('id')}
	            id={sensor.get('id')}
	            name={sensor.get('name')}
       		    type={sensor.getIn(['sensor_type','name'])}
		    reading={sensor.getIn(['current_reading','temperature']) || '--'}
	       	    lastUpdated={sensor.get('reading_at')}
	    	/>);
	})}
      </div>
    );
  }
};

SensorCardList.propTypes = {
  sensors: ImmutablePropTypes.list.isRequired,
  readings: ImmutablePropTypes.map.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SensorCardList);
