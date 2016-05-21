import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import sensorsReducer from '../../src/client/reducers/sensors.js';
import readingsReducer from '../../src/client/reducers/readings.js';
import { loadSensors as loadSensorCreator, newReading as newReadingCreator, loadReadings }  from '../../src/client/action_creators.js';

describe('Reducers', () => {

    describe('Sensors', () => {    
    
        it('returns the initial state by default', () => {
            const initialState = List();
            const unknownAction = '';
            const result = sensorsReducer(initialState,unknownAction);

            expect(result).to.equal(initialState);
        });

        describe('Handles actions', () => {

            describe('Loading sensors', () => {
                
                it('from empty initial state sets the sensors list', () => {
                    const initialState2 = List();
                    const newSensorList = [  
                        {  
                          id:1,
                          name:"Living Room",
                          sensor_type_id:1,
                          api_key:"72f18b5f6f63b572e58c48d19c957b51",
                          created_at:null,
                          updated_at:"2016-05-03T03:08:12.876Z",
                          current_reading:"122.00",
                          reading_at:"2016-05-28T23:52:08.000Z",
                          sensortype:{  
                             id:1,
                             name:"Local",
                             created_at:null,
                             updated_at:null
                          }
                        },
                        {  
                          id:2,
                          name:"Lake Oswego",
                          sensor_type_id:2,
                          api_key:"72f18b5f6f63b572e58c48d19c957b52",
                          created_at:null,
                          updated_at:"2016-05-03T16:36:37.224Z",
                          current_reading:"92.00",
                          reading_at:"2016-05-28T23:55:12.000Z",
                          sensortype:{  
                             id:2,
                             name:"External",
                             created_at:null,
                             updated_at:null
                          }
                        }
                    ];
                    expect(sensorsReducer(initialState2,loadSensorCreator(newSensorList))).to.equal(fromJS(newSensorList));
                });

                it('overwrites the old sensors list if sensors are already present', () => {
                    const initialState = fromJS([  
                        {  
                          id:1,
                          name:"Living Room",
                          sensor_type_id:1,
                          api_key:"72f18b5f6f63b572e58c48d19c957b51",
                          created_at:null,
                          updated_at:"2016-05-03T03:08:12.876Z",
                          current_reading:"122.00",
                          reading_at:"2016-05-28T23:52:08.000Z",
                          sensortype:{  
                             id:1,
                             name:"Local",
                             created_at:null,
                             updated_at:null
                          }
                        },
                        {  
                          id:2,
                          name:"Lake Oswego",
                          sensor_type_id:2,
                          api_key:"72f18b5f6f63b572e58c48d19c957b52",
                          created_at:null,
                          updated_at:"2016-05-03T16:36:37.224Z",
                          current_reading:"92.00",
                          reading_at:"2016-05-28T23:55:12.000Z",
                          sensortype:{  
                             id:2,
                             name:"External",
                             created_at:null,
                             updated_at:null
                          }
                        }
                    ]);
                    const newSensorList = [
                        {  
                          id:1,
                          name:"Living Room",
                          sensor_type_id:1,
                          api_key:"72f18b5f6f63b572e58c48d19c957b51",
                          created_at:"2016-05-03T03:08:12.876Z",
                          updated_at:"2016-05-03T03:08:12.876Z",
                          current_reading:"78.10",
                          reading_at:"2016-05-28T23:52:08.000Z",
                          sensortype:{  
                             id:1,
                             name:"Local",
                             created_at:"2016-05-03T03:08:12.876Z",
                             updated_at:"2016-05-03T03:08:12.876Z"
                          }
                        },
                        {  
                          id:2,
                          name:"Lake Oswego",
                          sensor_type_id:2,
                          api_key:"72f18b5f6f63b572e58c48d19c957b52",
                          created_at:"2016-05-03T16:36:37.224Z",
                          updated_at:"2016-05-03T16:36:37.224Z",
                          current_reading:"91.02",
                          reading_at:"2016-05-28T23:55:12.000Z",
                          sensortype:{  
                             id:2,
                             name:"External",
                             created_at:"2016-05-03T16:36:37.224Z",
                             updated_at:"2016-05-03T16:36:37.224Z"
                          }
                        },
                        {  
                          id:3,
                          name:"Bed Room",
                          sensor_type_id:1,
                          api_key:"72f18b5f6f63b572e58c48d19c957b53",
                          created_at:"2016-05-03T03:08:12.876Z",
                          updated_at:"2016-05-03T16:36:37.224Z",
                          current_reading:"93.01",
                          reading_at:"2016-05-28T23:55:12.000Z",
                          sensortype:{  
                             id:1,
                             name:"Local",
                             created_at:"2016-05-03T03:08:12.876Z",
                             updated_at:"2016-05-03T03:08:12.876Z"
                          }
                        }
                    ];
                    expect(sensorsReducer(initialState,loadSensorCreator(newSensorList))).to.equal(fromJS(newSensorList));
                });
            });

            describe('New readings', () => {
                it('update current reading and timestamps on a sensor', () => {
                    const newTemperature = '88.02';
                    const newReading_at = '2016-05-28T23:55:12.000Z';

                    const newReading = {
                        id: null, //this is kinda tricky because im getting the sensor object not the reading object
                        sensor_id: 2,
                        temperature: newTemperature,
                        reading_at: newReading_at
                    };
                    const initialState = fromJS([  
                        {  
                          id:1,
                          name:"Living Room",
                          sensor_type_id:1,
                          api_key:"72f18b5f6f63b572e58c48d19c957b51",
                          created_at:null,
                          updated_at:"2016-05-03T03:08:12.876Z",
                          current_reading:"122.00",
                          reading_at:"2016-05-28T23:52:08.000Z",
                          sensortype:{  
                             id:1,
                             name:"Local",
                             created_at:null,
                             updated_at:null
                          }
                        },
                        {  
                          id:2,
                          name:"Lake Oswego",
                          sensor_type_id:2,
                          api_key:"72f18b5f6f63b572e58c48d19c957b52",
                          created_at:null,
                          updated_at:"2016-05-03T16:36:37.224Z",
                          current_reading:"92.00",
                          reading_at:"2016-05-28T23:55:12.000Z",
                          sensortype:{  
                             id:2,
                             name:"External",
                             created_at:null,
                             updated_at:null
                          }
                        }
                    ]);
                    const expectedState = fromJS([  
                        {  
                          id:1,
                          name:"Living Room",
                          sensor_type_id:1,
                          api_key:"72f18b5f6f63b572e58c48d19c957b51",
                          created_at:null,
                          updated_at:"2016-05-03T03:08:12.876Z",
                          current_reading:"122.00",
                          reading_at:"2016-05-28T23:52:08.000Z",
                          sensortype:{  
                             id:1,
                             name:"Local",
                             created_at:null,
                             updated_at:null
                          }
                        },
                        {  
                          id:2,
                          name:"Lake Oswego",
                          sensor_type_id:2,
                          api_key:"72f18b5f6f63b572e58c48d19c957b52",
                          created_at:null,
                          updated_at:"2016-05-03T16:36:37.224Z",
                          current_reading:newTemperature,
                          reading_at:newReading_at,
                          sensortype:{  
                             id:2,
                             name:"External",
                             created_at:null,
                             updated_at:null
                          }
                        }
                    ]);
                    expect(sensorsReducer(initialState,newReadingCreator(newReading))).to.equal(expectedState);
                });
            });
        });
    });

    describe('Readings', () => { 

        it('returns the initial state by default', () => {
            const initialState = Map();
            const unknownAction = '';
            const result = readingsReducer(initialState,unknownAction);

            expect(result).to.equal(initialState);
        });

        describe('Handles actions', () => {

            describe('Load Sensors', () => {
                it('adds new Map keys for each sensor', ()=> {
                  const initialState = Map();
                  const newSensorList = [  
                      {  
                        id:1,
                        name:"Living Room",
                        sensor_type_id:1,
                        api_key:"72f18b5f6f63b572e58c48d19c957b51",
                        created_at:null,
                        updated_at:"2016-05-03T03:08:12.876Z",
                        current_reading:"122.00",
                        reading_at:"2016-05-28T23:52:08.000Z",
                        sensortype:{  
                           id:1,
                           name:"Local",
                           created_at:null,
                           updated_at:null
                        }
                      },
                      {  
                        id:2,
                        name:"Lake Oswego",
                        sensor_type_id:2,
                        api_key:"72f18b5f6f63b572e58c48d19c957b52",
                        created_at:null,
                        updated_at:"2016-05-03T16:36:37.224Z",
                        current_reading:"92.00",
                        reading_at:"2016-05-28T23:55:12.000Z",
                        sensortype:{  
                           id:2,
                           name:"External",
                           created_at:null,
                           updated_at:null
                        }
                      }
                  ];
                  const result = readingsReducer(initialState,loadSensorCreator(newSensorList));
                  expect(List.isList(result.get('1'))).to.equal(true);
                  expect(List.isList(result.get('2'))).to.equal(true);
                });

                it('adds the current_reading to the readings List', ()=> {
                  const initialState = Map();
                  const newSensorList = [  
                      {  
                        id:1,
                        name:"Living Room",
                        sensor_type_id:1,
                        api_key:"72f18b5f6f63b572e58c48d19c957b51",
                        created_at:null,
                        updated_at:"2016-05-03T03:08:12.876Z",
                        current_reading:"122.00",
                        reading_at:"2016-05-28T23:52:08.000Z",
                        sensortype:{  
                           id:1,
                           name:"Local",
                           created_at:null,
                           updated_at:null
                        }
                      },
                      {  
                        id:2,
                        name:"Lake Oswego",
                        sensor_type_id:2,
                        api_key:"72f18b5f6f63b572e58c48d19c957b52",
                        created_at:null,
                        updated_at:"2016-05-03T16:36:37.224Z",
                        current_reading:"92.00",
                        reading_at:"2016-05-28T23:55:12.000Z",
                        sensortype:{  
                           id:2,
                           name:"External",
                           created_at:null,
                           updated_at:null
                        }
                      }
                  ];
                  const expectedResult = fromJS({
                    '1': [{
                      id: null,
                      sensor_id: 1,
                      temperature: "122.00",
                      reading_at: "2016-05-28T23:52:08.000Z"
                    }],
                    '2': [{
                      id: null,
                      sensor_id: 2,
                      temperature: "92.00",
                      reading_at: "2016-05-28T23:55:12.000Z"
                    }]
                  });                  
                  expect(readingsReducer(initialState,loadSensorCreator(newSensorList))).to.equal(expectedResult);
                });     
            });

            describe('New Readings', () => {
                it('are added to the correct sensor reading list', () => {

                    const newReading = {
                        id: null, //this is kinda tricky because im getting the sensor object not the reading object
                        sensor_id: 2,
                        temperature: '88.02',
                        reading_at: '2016-05-28T23:55:12.000Z'
                    };
                    const initialState = fromJS({  
                        '1':[
                          {  
                            id:"21",
                            sensor_id:1,
                            temperature:"122.00",
                            created_at:"2016-05-03T03:08:12.871Z",
                            updated_at:"2016-05-03T03:08:12.871Z",
                            reading_at:"2016-05-28T23:52:08.000Z"
                          }
                        ],
                        '2': [
                          {  
                              id:"20",
                              sensor_id:2,
                              temperature:"100.00",
                              created_at:"2016-05-03T03:07:30.881Z",
                              updated_at:"2016-05-03T03:07:30.881Z",
                              reading_at:"2016-05-28T23:51:08.000Z"
                          }
                        ]
                    });
                    const expectedState = fromJS({
                        '1': [
                          {  
                              id:"21",
                              sensor_id:1,
                              temperature:"122.00",
                              created_at:"2016-05-03T03:08:12.871Z",
                              updated_at:"2016-05-03T03:08:12.871Z",
                              reading_at:"2016-05-28T23:52:08.000Z"
                          }
                        ],
                        '2': [
                          {  
                            id:"20",
                            sensor_id:2,
                            temperature:"100.00",
                            created_at:"2016-05-03T03:07:30.881Z",
                            updated_at:"2016-05-03T03:07:30.881Z",
                            reading_at:"2016-05-28T23:51:08.000Z"
                          },
                          {
                            id: null, //this is kinda tricky because im getting the sensor object not the reading object
                            sensor_id: 2,
                            temperature: '88.02',
                            reading_at: '2016-05-28T23:55:12.000Z'
                          }
                        ]
                    });
                    expect(readingsReducer(initialState,newReadingCreator(newReading))).to.equal(expectedState);
                });
            });
        });
    });
});