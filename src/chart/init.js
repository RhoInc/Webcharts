/** Begins 
*@memberof webCharts.objects.chart
*@method init
*@param {Array} [data] raw data to be used in the place of dataset parsed from {@link webCharts~chart.filepath filepath}
*/
export function init(data){
    let config = this.config;

    if(d3.select(this.div).select('.loader').empty()){
        d3.select(this.div).insert('div', ':first-child').attr('class', 'loader')
          .selectAll('.blockG').data(d3.range(8))
          .enter().append('div').attr('class', d => 'blockG rotate'+(d+1) );
    }
    this.wrap.attr('class', 'wc-chart');

    this.setDefaults();

    let startup = (data => {
      if(this.controls){
          this.controls.targets.push(this);
          if(!this.controls.ready){
            this.controls.init(data);
          }
          else{
            this.controls.layout();
          }
      }

      this.raw_data = data;

      //redo this without jquery
      var visible = window.$ ? $(this.div).is(':visible') : true;
      if(!visible){
          var onVisible = setInterval(i => {
              let visible_now = $(this.div).is(':visible');
              if(visible_now){
                this.layout();
                this.wrap.datum(this);
                let init_data = this.transformData(data);
                this.draw(init_data);
                clearInterval(onVisible);
              }
         }, 500);
      }
      else{
        this.layout();
        this.wrap.datum(this);
        this.draw();
      }
    });

    if(this.filepath && !data){
        d3.csv(this.filepath, (error, csv) => {
          this.raw_data = csv;
          this.onDataError(error);
          this.checkRequired(csv);
          startup(csv);
        });
      }
    else{
      startup(data);
    }

    return this;
}
