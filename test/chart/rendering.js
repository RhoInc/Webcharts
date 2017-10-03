import jsdom from 'jsdom';
import createChart from '../../src/createChart';
import expect from 'expect';
import d3 from 'd3';

export default function testRendering(settings, data) {
    describe('chart rendering', () => {
        const { JSDOM } = jsdom;
        let dom, container, chart, supergroups, groups;

        before(() => {
            dom = new JSDOM('<!DOCTYPE html>');
            container = dom.window.document.createElement('div');
            chart = createChart(container, settings).init(data, true);
            supergroups = chart.svg.selectAll(
                '.point-supergroup, .bar-supergroup, .line-supergroup, .text-supergroup'
            );
            groups = supergroups.selectAll('.point, .bar-group, .line, .text');
        });

        after(() => {
            container.children[0].remove();
            chart = null;
        });

        it('SVG created when .init() is called. ', () => {
            expect(chart.svg).toExist();
        });

        it('g.supergroup elements are present for each specified mark type. ', () => {
            const markTypes = settings.marks.map(
                m => (m.type == 'circle' ? 'point-supergroup' : m.type + '-supergroup')
            );
            const superGroupTypes = supergroups[0].map(m => d3.select(m).attr('class'));
            expect(markTypes.sort()).toEqual(superGroupTypes.sort());
        });

        it('1+ g elements are present in each g.supergroup. ', () => {
            const groupCounts = groups.map(m => m.length);
            expect(groupCounts).toExclude(0);
        });

        it('1+ svg mark is present in each mark g.group. ', () => {
            const markCounts = groups.selectAll('.wc-data-mark').map(m => m.length);
            expect(markCounts).toExclude(0);
        });

        it('x axis & y axis are present. ', () => {
            var axes = chart.svg.selectAll('g.axis');
            expect(axes[0].length).toEqual(2);
        });

        it('x axis & y axis have ticks. ', () => {
            var tickCount = chart.svg.selectAll('g.axis').selectAll('.tick').map(m => m.length);
            expect(tickCount).toExclude(0);
        });
    });
}
