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
    var component = this;

    var id = component.props.id;
    var name = component.props.name;
    var type = component.props.type;
    var current_reading = component.props.current_reading;
    var reading_at = new Date(Date.parse(component.props.reading_at));

    var now = new Date(); 
    var diff = now.getTime() - reading_at.getTime();
    
    var day = (24*60*60*1000);
    var hour = (60*60*1000);
    var min = (60*1000);
    var sec = (1000);
    
    // format timestamp
    var dateTimeStampUI = 'Last Updated: ';
    var plural = 's';
    if(component.state.hover) {
      dateTimeStampUI = reading_at.toString();
    }else{
      if(diff/ day > 1) { // over a day
        var age = Math.round(diff/ day);
        if(age < 2) {plural = '';}
        dateTimeStampUI += age + ' Day' + plural + ' Ago';
      }else if(diff/ hour > 1) { // over an hour
        var age = Math.round(diff/ hour);
        if(age < 2) {plural = '';}
        dateTimeStampUI += age +' Hour' + plural + ' Ago';
      }else if(diff/ min > 1) { // over a min
        var age = Math.round(diff/ min);
        if(age < 2) {plural = '';}
        dateTimeStampUI += age +' Minute' + plural + ' Ago';
      }else if(diff/ sec > 0) { // over a sec
        //setInterval(component.render, 1000); // re-render every second so the ui counts down seconds
        var age = Math.round(diff/ sec);
        if(age < 2) {plural = '';}              
        dateTimeStampUI += age +' Second' + plural + ' Ago'; 
      }else { // default future
        dateTimeStampUI += 'In the future!?';
        //setInterval(component.render, 1000); // re-render every second so the ui counts down seconds **might want to limit this if its really far in the future.
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
          <span className="sensor-timestamp" onMouseEnter={component.onMouseEnterHandler} onMouseLeave={component.onMouseLeaveHandler}>
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
          key={sensorData.id} // to please the react gods
          id={sensorData.id} 
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