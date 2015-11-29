//Sensor
var Sensor = React.createClass({
  getInitialState: function(){
    return {};
  },
  componentDidMount: function() {
    this.setState(this.props.data);
  },
  render: function() {
    
    var readingDateTime = new Date(Date.parse(this.state.readingdatetime));
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
            <div><span className="sensor-type">{this.state.type}</span></div>
          </div>
        </div>
        <div>
          <span className="sensor-temperature">{this.state.temperature} ºF</span>
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
    $.get("https://api.myjson.com/bins/1cms7", function(data){
      component.setState({sensors: data});
    });
  },
  render: function(){
    var allSensors = this.state.sensors.map(function(sensorData){
      return (<Sensor data={sensorData} />);
    });
    return (
      <div>
        {allSensors}
      </div>
    );
  }
});

//Render
React.render(<Main />, document.getElementById("root"));