export function init(data){
    this.data = data;
    if(d3.select(this.div).select('.loader').empty()){
        d3.select(this.div).insert('div', ':first-child')
          .attr('class', 'loader')
          .selectAll('.blockG').data(d3.range(8))
            .enter().append('div')
            .attr('class', d => 'blockG rotate'+(d+1) );
    }
    this.wrap.attr('class', 'wc-chart');

    this.setDefaults();

    let startup = (data => {
      //connect this chart and its controls, if any
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

      //make sure container is visible (has height and width) before trying to initialize
      var visible = d3.select(this.div).property('offsetWidth') > 0 && d3.select(this.div).property('offsetHeight') > 0;
      if(!visible){
          var onVisible = setInterval(i => {
              let visible_now = d3.select(this.div).property('offsetWidth') > 0 && d3.select(this.div).property('offsetHeight') > 0;
              if(visible_now){
                this.layout();
                this.wrap.datum(this);
                this.draw();
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

    if(this.data.length){
      this.checkRequired(data);
    }
    startup(data);

    return this;
}
