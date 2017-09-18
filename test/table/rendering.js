import jsdom from 'jsdom';
import createChart from '../../src/createTable';
import expect from 'expect';
import d3 from 'd3';

export default function testRendering(settings, data) {
  describe('table rendering', () => {
    const { JSDOM } = jsdom;
    let dom, container, chart, supergroups, groups;

    before(() => {
        dom = new JSDOM('<!DOCTYPE html>');
        container = dom.window.document.createElement('div');
        table = createTable(container, settings).init(data,true)
    });

    after(() => {
        container.children[0].remove();
        chart = null;
    });


    it('table to be created when .init() is called. ', () => {
      expect(table.table).toExist();
    });

    //rows to exist for each record
    //headers to exist
    
  });
}
