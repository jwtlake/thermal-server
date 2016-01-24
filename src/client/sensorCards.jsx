var React = require('react');
var ReactDOM = require('react-dom');
var socket = io(); //should i be passing this bundled?

//Sensor
var Sensor = React.createClass({
  getInitialState: function(){
    return {};
  },
  componentDidMount: function() {
    this.setState(this.props.data);
  },
  render: function() {
    
    //added check to prevent errors if there was no sensortype object
    if (this.state.sensortype && this.state.sensortype.name)
      var type = this.state.sensortype.name 

    var readingDateTime = new Date(Date.parse(this.state.reading_at));
    var now = new Date(); 
    var diff = now.getTime() - readingDateTime.getTime();
    
    var day = (24*60*60*1000);
    var hour = (60*60*1000);
    var min = (60*1000);
    var sec = (1000);
    
    var dateTimeStampUI = '';
    
    //over a day
    if(diff/ day > 1){
      var dTime = Math.round(diff/ day);
      dateTimeStampUI += dTime +' Days Ago';
    }
    //over an hour
    else if(diff/ hour > 1){
      var hTime = Math.round(diff/ hour);
      dateTimeStampUI += hTime +' Hours Ago';
    }
    //over a min
    else if(diff/ min > 1){
      var mTime = Math.round(diff/ min);
      dateTimeStampUI += mTime +' Mins Ago';
    }else{
      var sTime = Math.round(diff/ sec);
      dateTimeStampUI += sTime +' Seconds Ago';
    }

    return (
      <div className="sensor-card">
        <div className="sensor-row">
          <div className="sensor-block" >
            <img src="http://www.gdsinstruments.com/__assets__/WebPages/00226/temperature-controlled.jpg" width="50"/>
          </div>
          <div className="sensor-block">
            <div><span className="sensor-name">{this.state.name}</span></div>
            <div><span className="sensor-type">{type}</span></div>
          </div>
        </div>
        <div>
          <span className="sensor-temperature">{this.state.current_reading} ºF</span>
          <br/>
          <span className="sensor-timestamp">Last Updated: {dateTimeStampUI}</span>
        </div>
      </div>
    );
  }
});

//Main
var Main = React.createClass({
  getInitialState: function() {
    return {sensors:[]};
  },
  componentDidMount: function() {
    var component = this;
    $.get("/api/sensors", function(data){
      component.setState({sensors: data});
    });
  },
  render: function(){
    var allSensors = this.state.sensors.map(function(sensorData){
      return (<Sensor key={sensorData.id} data={sensorData} />);
    });
    return (
      <div>
        {allSensors}
      </div>
    );
  }
});

// Socket events
socket.on('newReading', function (data) {
  alert('newReading');
});

//Render
ReactDOM.render(<Main />, document.getElementById("root"));