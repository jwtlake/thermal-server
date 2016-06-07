import React from 'react';
import Moment from 'moment';
import TransitiveNumber from 'react-transitive-number';

import Chart from './Chart';
import Thermometer from './Thermometer';

// Added moment.js locale to include seconds 
Moment.locale('precise-en', {
    relativeTime : {
        future : "in %s",
        past : "%s ago",
        s : "%d seconds", //added
        m : "a minute",
        mm : "%d minutes",
        h : "an hour",
        hh : "%d hours",
        d : "a day",
        dd : "%d days",
        M : "a month",
        MM : "%d months",
        y : "a year",
        yy : "%d years"
    }
});
Moment.locale('precise-en'); //set new locale

const styles = {
  sensorCard: {
    padding: '10px 40px',
    marginTop: '10px',
    marginLeft: '10px',
    background: '#3498db',
    maximumWidth: '350px',
    borderRadius: '3px',
    color: 'white'
  },

  sensorRow: {
    textAlign: 'left'
  },

  sensorBlock: {
    padding: '5px 10px 5px 0px',
    display: 'inline-block',
    verticalAlign: 'top'
  },

  sensorName: {
    fontSize: '20px'
  },

  sensorType: {
    fontSize: '10px',
    fontStyle: 'oblique'
  },

  sensorTemperature: {
    marginTop: '5px',
    fontSize: '20px'
  },

  sensorTimestamp: {
    fontSize: '10px',
    fontStyle: 'oblique'
  }
}

class SensorCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };

    // bind
    this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this); 
    this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.tick = this.tick.bind(this); 
  }

  onMouseEnterHandler() {
    this.setState({ hover: true });
  }
  onMouseLeaveHandler() {
    this.setState({ hover: false });
  }
  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);    
  } 
  tick() {
    this.forceUpdate(); //is there a better way to do this?
  }

  render() {
    const {
      props: { id, name, type, reading, lastUpdated }
    } = this;

    return (
      <div style={ styles.sensorCard }>
        <div style={ styles.sensorRow }>
          <div style={ styles.sensorBlock }>
            <Thermometer reading={ reading } />
          </div>
          <div style={ styles.sensorBlock }>
            <div><span style={ styles.sensorName }>{ name }</span></div>
            <div><span style={ styles.sensorType }>{ type }</span></div>
          </div>
        </div>
        <div>
          <span style={ styles.sensorTemperature }>
            <TransitiveNumber enableInitialAnimation={true}>{ reading }</TransitiveNumber> ºF
          </span>
          <br/>
          <span style={ styles.sensorTimestamp } onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}> 
            { (this.state.hover) ? 
              'Last Updated: ' + Moment(lastUpdated).format("dddd, MMMM Do YYYY, h:mm:ss a") : 
              'Last Updated: ' + Moment(lastUpdated).fromNow() }
          </span>
        </div>
      </div>
    );
  }
}

export default SensorCard;