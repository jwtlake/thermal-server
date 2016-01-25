var React = require('react');
var ReactDOM = require('react-dom');
var socket = io(); // should i be passing this bundled?

//Sensor
var Sensor = React.createClass({
  getInitialState: function() {
    return {hover: false};
  },
  onMouseEnterHandler: function() {
    this.setState({hover: true});
  },
  onMouseLeaveHandler: function() {
    this.setState({hover: false});
  },
  render: function() {

    var id = this.props.id;
    var name = this.props.name;
    var type = this.props.type;
    var current_reading = this.props.current_reading;
    var reading_at = new Date(Date.parse(this.props.reading_at));

    var now = new Date(); 
    var diff = now.getTime() - reading_at.getTime();
    
    var day = (24*60*60*1000);
    var hour = (60*60*1000);
    var min = (60*1000);
    var sec = (1000);
    
    // format timestamp
    var dateTimeStampUI = 'Last Updated: ';
    if(this.state.hover) {
      dateTimeStampUI = reading_at.toString();
    }else{
      if(diff/ day > 1) { // over a day
        dateTimeStampUI += Math.round(diff/ day) +' Days Ago';
      }else if(diff/ hour > 1) { // over an hour
        dateTimeStampUI += Math.round(diff/ hour) +' Hours Ago';
      }else if(diff/ min > 1) { // over a min
        dateTimeStampUI += Math.round(diff/ min) +' Mins Ago';
      }else if(diff/ sec > 1) { // over a seconds
        dateTimeStampUI += Math.round(diff/ sec) +' Seconds Ago';
      }else { // default future
        dateTimeStampUI += 'In the future!?';
        console.log('Unexpected sensor reading date - reading in the future. SensorId: '+id+' read_at: '+ reading_at);
      }
    }

    return (
      <div className="sensor-card">
        <div className="sensor-row">
          <div className="sensor-block" >
            <img src="http://www.gdsinstruments.com/__assets__/WebPages/00226/temperature-controlled.jpg" width="50"/>
          </div>
          <div className="sensor-block">
            <div><span className="sensor-name">{name}</span></div>
            <div><span className="sensor-type">{type}</span></div>
          </div>
        </div>
        <div>
          <span className="sensor-temperature">{current_reading} ºF</span>
          <br/>
          <span className="sensor-timestamp" onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>
            {dateTimeStampUI}
          </span>
        </div>
      </div>
    );
  }
});

// Main
var Main = React.createClass({
  getInitialState: function() {
    return {sensors:[]};
  },
  componentDidMount: function() {
    var component = this;
    
    // API call to get initial data
    $.get("/api/sensors", function(data) {
      component.setState({sensors: data});
    });

    // Socket events to handle changes
    socket.on('newReading', function (message) {
      component.processesNewReading(message);
    });
  },
  processesNewReading: function(message) {
      var component = this;

      // create new state obj
      var sensors = this.state.sensors; 
      for(let sensor of sensors) {
          if(sensor.id === message.id) {
            sensor.current_reading = message.current_reading;
            sensor.reading_at = message.reading_at;
          }
      } 
      this.setState({sensors: sensors});
  },
  render: function(){    
    var allSensors = this.state.sensors.map(function(sensorData) {
      return (
        <Sensor 
          key={sensorData.id} 
          name={sensorData.name}
          type={sensorData.sensortype.name}
          current_reading={sensorData.current_reading}
          reading_at={sensorData.reading_at} />
      );
    });

    return (
      <div>
        {allSensors}
      </div>
    );
  }
});

//Render
ReactDOM.render(<Main socketObj={socket} />, document.getElementById("root"));