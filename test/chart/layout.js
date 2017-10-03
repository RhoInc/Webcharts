import jsdom from 'jsdom';
import createChart from '../../src/createChart';
import expect from 'expect';

export default function testLayout(settings, data) {
    describe('chart layout', () => {
        const { JSDOM } = jsdom;
        let dom, container, chart, svg, svgChildren;

        before(() => {
            dom = new JSDOM('<!DOCTYPE html>');
            container = dom.window.document.createElement('div');
            chart = createChart(container, settings).init(data, true);
            svg = chart.svg;
            svgChildren = Array.prototype.slice.call(svg.node().children);
        });

        it('creates an svg child element of chart container with a g child element', () => {
            expect(svg).toExist();
            expect(svg.node().parentNode.nodeName.toLowerCase()).toEqual('svg');
            expect(svg.node().nodeName.toLowerCase()).toEqual('g');
        });

        it('creates a defs child element of svg with a clipPath child element', () => {
            const defs = svgChildren.filter(child => child.nodeName.toLowerCase() === 'defs'),
                defsChildren = Array.prototype.slice.call(defs[0].children),
                pattern = defsChildren.filter(child => child.nodeName.toLowerCase() === 'pattern'),
                clipPath = defsChildren.filter(
                    child => child.nodeName.toLowerCase() === 'clippath'
                );
            expect(defs.length).toEqual(1);
            expect(pattern.length).toEqual(1);
            expect(clipPath.length).toEqual(1);
        });

        it('creates an x-axis g child element of svg', () => {
            const xAxis = svgChildren.filter(
                child =>
                    child.nodeName.toLowerCase() === 'g' && child.className.indexOf('x axis') > -1
            );
            expect(xAxis.length).toEqual(1);
        });

        it('creates a y-axis g child element of svg', () => {
            const yAxis = svgChildren.filter(
                child =>
                    child.nodeName.toLowerCase() === 'g' && child.className.indexOf('y axis') > -1
            );
            expect(yAxis.length).toEqual(1);
        });

        it('creates an overlay rect child element of svg', () => {
            const overlay = svgChildren.filter(
                child =>
                    child.nodeName.toLowerCase() === 'rect' &&
                    child.className.indexOf('overlay') > -1
            );
            expect(overlay.length).toEqual(1);
        });

        it('creates a legend ul child element of chart container', () => {
            const legend = Array.prototype.slice
                .call(chart.wrap.node().children)
                .filter(
                    child =>
                        child.nodeName.toLowerCase() === 'ul' &&
                        child.className.indexOf('legend') > -1
                );
            expect(legend.length).toEqual(1);
        });
    });
}
