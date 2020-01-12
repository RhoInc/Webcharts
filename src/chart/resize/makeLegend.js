import moveLegend from './makeLegend/moveLegend';
import defineLegendData from './makeLegend/defineLegendData';
import addLegendTitle from './makeLegend/addLegendTitle';
import addLegendItems from './makeLegend/addLegendItems';
import addLegendMarkTexts from './makeLegend/addLegendMarkTexts';
import addLegendColorBlocks from './makeLegend/addLegendColorBlocks';
import addLegendMarks from './makeLegend/addLegendMarks';
import addLegendLabels from './makeLegend/addLegendLabels';

export default function makeLegend(scale = this.colorScale, label = '', custom_data = null) {
    this.legend = moveLegend.call(this, scale);

    // determine appropriate legend settings and data
    const legend_label = label || this.config.legend.label || '';
    const legend_data = defineLegendData.call(this, custom_data, scale);

    // add legend title and items
    const legend_title = addLegendTitle.call(this, legend_label);
    const legend_items = addLegendItems.call(this, legend_data, scale);
    const legend_mark_texts = addLegendMarkTexts.call(this, legend_items, scale);
    const legend_color_blocks = addLegendColorBlocks.call(this, legend_items);
    const legend_marks = addLegendMarks.call(this, legend_color_blocks, scale);
    const legend_labels = addLegendLabels.call(this, legend_items);
}
