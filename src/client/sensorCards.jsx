var React = require('react');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');
var TransitiveNumber = require('react-transitive-number');
var socket = io(); // should i be passing this bundled?


// Sensor
var Sensor = React.createClass({
  getInitialState: function() {
    var reading_at = new Date(Date.parse(this.props.reading_at));
    var now = new Date(); 
    var secondsElapsed = Math.floor((now.getTime() - reading_at.getTime()) / 1000);
    return {hover: false, secondsElapsed: secondsElapsed, reading_at: reading_at};
  },
  onMouseEnterHandler: function() {
    this.setState({hover: true});
  },
  onMouseLeaveHandler: function() {
    this.setState({hover: false});
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);    
  },
  tick: function() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  },
  componentWillReceiveProps: function() {
    var reading_at = new Date(Date.parse(this.props.reading_at));
    var now = new Date(); 

    //calculate elapsed seconds
    var timeDiff = now - reading_at; // time difference in ms
    timeDiff /= 1000; // strip the miliseconds
    var secondsElapsed = Math.round(timeDiff % 60);

    //update state
    this.setState({secondsElapsed: secondsElapsed, reading_at: reading_at});
  },
  render: function() {
    var component = this;

    var id = component.props.id;
    var name = component.props.name;
    var type = component.props.type;
    var current_reading = component.props.current_reading;
    var reading_at = component.state.reading_at.toString();
    var secondsElapsed = component.state.secondsElapsed;

    var sec = (1);
    var min = (60 * sec);
    var hour = (60 * min);
    var day = (24 * hour);

    var dateTimeStampUI = 'Last Updated: ';
    if(component.state.hover) {
      // display timestamp
      dateTimeStampUI += reading_at;
    }else{      
      // display time since last update
      var age = '';
      var increment = '';
      var inTheFuture = false;
      
      //handle future dates
      if(secondsElapsed < 0) {
        secondsElapsed *= -1;
        inTheFuture = true;
      }

      // over a day
      if(secondsElapsed > day) { 
        age = Math.floor(secondsElapsed / day);
        increment = 'Day';

      // over an hour
      }else if(secondsElapsed > hour) {
        age = Math.floor(secondsElapsed / hour);
        increment = 'Hour';

      // over a min
      }else if(secondsElapsed > min) {
        age = Math.floor(secondsElapsed / min);
        increment = 'Minute';

      // over a sec OR zero seconds
      }else if(secondsElapsed >= sec || secondsElapsed == 0) {
        age = Math.floor(secondsElapsed / sec);
        increment = 'Second';

      }else { // less than a sec
        age = Math.floor(secondsElapsed / sec);
        increment = 'Second';
        console.log('Unexpected sensor reading date - reading fell through if statments. [SensorId: ' + id + ' SecondsElapsed: ' + secondsElapsed + ' Age: ' + age + '  read_at: ' + reading_at + ']');
      }

      // build final with plural check
      dateTimeStampUI += age + ' ' + increment;

      // check for plurals
      if(age > 1) {
        dateTimeStampUI += 's';
      }

      // set tense
      if(inTheFuture) {
        dateTimeStampUI += ' In The Future?!';
        console.log('Unexpected sensor reading date - reading in the future. [SensorId: ' + id + ' SecondsElapsed: ' + secondsElapsed + ' Age: ' + age + '  read_at: ' + reading_at + ']');
      }else{
        dateTimeStampUI += ' Ago';
      }
    }

    return (
      <div className="sensor-card">
        <div className="sensor-row">
          <div className="sensor-block">
            <img src="http://www.gdsinstruments.com/__assets__/WebPages/00226/temperature-controlled.jpg" width="50"/>
          </div>
          <div className="sensor-block">
            <div><span className="sensor-name">{name}</span></div>
            <div><span className="sensor-type">{type}</span></div>
          </div>
        </div>
        <div>
          <span className="sensor-temperature">
            <TransitiveNumber>{current_reading}</TransitiveNumber> ºF
          </span>
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

// Render
ReactDOM.render(<Main socketObj={socket} />, document.getElementById("root"));