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
            /* supergroups = chart.svg.selectAll(
                '.point-supergroup, .bar-supergroup, .line-supergroup, .text-supergroup'
            );*/
            (supergroups = chart.marks.supergroups),
                (groups = supergroups.selectAll('.point, .bar-group, .line, .text'));
        });

        after(() => {
            container.children[0].remove();
            chart = null;
        });

        it('SVG created when .init() is called. ', () => {
            expect(chart.svg).toExist();
        });

        it('g.supergroup elements are present for each specified mark type. ', () => {
            var supergroupsFound = 0;
            chart.marks.forEach(function(mark) {
                const markType =
                    mark.type == 'circle' ? 'point-supergroup' : mark.type + '-supergroup';
                if (mark.supergroup.classed(markType)) supergroupsFound = supergroupsFound + 1;
            });
            expect(supergroupsFound).toEqual(supergroups[0].length);
        });

        it('Each mark group has an ID attached as a class ', () => {
            chart.marks.forEach(function(mark, i) {
                expect(mark.supergroup.classed(mark.id)).toEqual(true);
            });
        });

        it('config marks is copied to chart.marks', () => {
            chart.marks.forEach(function(mark, i) {
                let property;
                for (property in chart.config.marks[i]) {
                    expect(chart.config.marks[i][property]).toEqual(mark[property]);
                }
            });
        });

        it('d3.selection for g.supergroup element bound to each item in chart.marks array', () => {
            chart.marks.forEach(function(mark, i) {
                let match = chart.svg.selectAll('g.supergroup').filter(function(f) {
                    return f.id == mark.id;
                });
                expect(mark.supergroup).toEqual(match);
            });
        });

        it('d3.selection for g.groups elements bound to each item in chart.marks array', () => {
            chart.marks.forEach(function(mark, i) {
                let groupType =
                    mark.type == 'bar'
                        ? 'bar-group'
                        : mark.type == 'circle'
                        ? 'point'
                        : mark.type == 'text'
                        ? 'text'
                        : mark.type == 'line'
                        ? 'line'
                        : 'mark type not found';
                let matches = chart.svg
                    .selectAll('g.supergroup')
                    .filter(function(f) {
                        return f.id == mark.id;
                    })
                    .selectAll('g.' + groupType);
                expect(mark.groups).toEqual(matches);
            });
        });

        it('d3.selection for specific d3 marks (circles, paths, etc) bound to each item in chart.marks array expect for when type=bar', () => {
            chart.marks
                .filter(f => f.type != 'bar')
                .forEach(function(mark, i) {
                    let groupType =
                        mark.type == 'circle'
                            ? 'point'
                            : mark.type == 'text'
                            ? 'text'
                            : mark.type == 'line'
                            ? 'line'
                            : 'mark type not found';

                    let markType =
                        mark.type == 'circle'
                            ? 'circle'
                            : mark.type == 'text'
                            ? 'text'
                            : mark.type == 'line'
                            ? 'path'
                            : 'mark type not found';

                    let markName = markType + 's';

                    let matches = chart.svg
                        .selectAll('g.supergroup')
                        .filter(function(f) {
                            return f.id == mark.id;
                        })
                        .selectAll('g.' + groupType)
                        .select(markType);

                    expect(mark[markName]).toEqual(matches);
                });
        });

        it('d3.selection containing all mark supergroups bound as property to the chart.marks array object', () => {
            expect(chart.marks.supergroups).toEqual(
                chart.svg.selectAll(
                    '.point-supergroup, .bar-supergroup, .line-supergroup, .text-supergroup'
                )
            );
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
            var tickCount = chart.svg
                .selectAll('g.axis')
                .selectAll('.tick')
                .map(m => m.length);
            expect(tickCount).toExclude(0);
        });

        it('all expected data sets are present, and have 1+ item', () => {
            var dataSets = ['initial_data', 'raw_data', 'filtered_data', 'current_data'];
            let setname;
            dataSets.forEach(function(setname) {
                expect(chart[setname].length).toBeGreaterThan(0);
            });
        });
    });
}
