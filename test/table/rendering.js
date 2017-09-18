import jsdom from 'jsdom';
import createTable from '../../src/createTable';
import expect from 'expect';
import d3 from 'd3';

export default function testRendering(settings, data) {
  describe('table rendering', () => {
    const { JSDOM } = jsdom;
    let dom, container, table;

    before(() => {
        dom = new JSDOM('<!DOCTYPE html>');
        container = dom.window.document.createElement('div');
        table = createTable(container, settings).init(data,true)
    });

    after(() => {
        container.children[0].remove();
        table = null;
    });

    it('table to be created when .init() is called. ', () => {
      expect(table.table).toExist();
    });

    it('thead to exist', () => {
      expect(table.table.select("thead").size()).toEqual(1)
    })

    it('thead to have exactly one tr', () => {
      expect(table.table.select("thead").selectAll("tr").size()).toEqual(1)
    })

    it('tbody to exist', () => {
      expect(table.table.select("tbody").size()).toBeGreaterThan(0)
    })

    it('tbody to have at least one tr', () => {
      expect(table.table.select("tbody").selectAll("tr").size()).toBeGreaterThan(0)
    })

  });
}
