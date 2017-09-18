import jsdom from 'jsdom';
import createTable from '../../src/createTable';
import expect from 'expect';

export default function testCreateChart(settings, full=true) {
  describe('table object creation', () => {
      const { JSDOM } = jsdom;
      let dom,
          container,
          table;

      before(() => {
          dom = new JSDOM('<!DOCTYPE html>');
          container = dom.window.document.createElement('div');
      });

      beforeEach(() => {
          table = createTable(container, settings);
      });

      afterEach(() => {
          container.children[0].remove();
          table = null;
      });

      describe('user calls createTable()', () => {
          it('webCharts returns table object with a given set of properties', () => {
              const properties = ['div', 'config', 'controls', 'filters', 'required_cols', 'wrap', 'events', 'on'];
              expect(Object.keys(table).sort()).toEqual(properties.sort());
          });

          if(full){
            it('table div property is equal to first argument to createTable()', () => {
                expect(table.div).toEqual(container);
            });

            it('table wrap property is d3 selection of first argument to createTable()', () => {
                expect(table.wrap.node()).toEqual(container.querySelector('div'));
            });

            it('table config property matches second argument to createTable()', () => {
                let settings = {},
                    property;
                for (property in settings)
                    expect(table.config[property]).toEqual(settings[property]);
            });
          }  
      });
  });
}
