var coolTable = webCharts.createTable('div.chart',{pagination:true});
d3.csv('https://cdn.jsdelivr.net/gh/RhoInc/data-library/data/miscellaneous/elements.csv', function(e,d){
  coolTable.init(d);
  var counter=5;
  interval = setInterval(function() {
    counter--;
    if(counter < 0) {
      coolTable.destroy();
      coolChart=null;
      d3.select('body').select(".message").html("The table has been destroyed. <br><button onClick='window.location.reload()'>Reload</button>")
      clearInterval(interval)
    } else {
      d3.select('body').select(".message").text("This table will self-destruct in in " + counter.toString() + " seconds.")
    }
  }, 1000);
})
