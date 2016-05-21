import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import makeStore from '../../src/client/store.js';

describe('Store', () => {

    describe('Initial State', () => {    
    
        it('is an Immutable.Map object', () => {
            const store = makeStore();
            const state = store.getState();
            const isImmutable = Map.isMap(state);

            expect(isImmutable).to.equal(true); //is Immutable.Map
        });

        it('contains the default App Immutable.Map object', () => {
            const store = makeStore();
            const state = store.getState();

            const app = state.get('app');
            const isImmutableMap = Map.isMap(app);

            expect(isImmutableMap).to.equal(true); //is Immutable.Map
            expect(app).to.equal(Map()); //empty list
        });

        it('contains an empty Sensors Immutable.List object', () => {
            const store = makeStore();
            const state = store.getState();

            const sensors = state.get('sensors');
            const isImmutableList = List.isList(sensors);

            expect(isImmutableList).to.equal(true); //is Immutable.List
            expect(sensors).to.equal(List()); //empty list

        });

        it('contains an empty Readings Immutable.Map object', () => {
            const store = makeStore();
            const state = store.getState();

            const readings = state.get('readings');
            const isImmutableMap = Map.isMap(readings);

            expect(isImmutableMap).to.equal(true); //is Immutable.Map
            expect(readings).to.equal(Map()); //empty list
        });
    });
});