import onClick from './onClick';

export default function addSort() {
    const
        context = this;

  //Add click listener to headers.
    const
        headers = this.table
            .selectAll('thead th')
            .on('click', function(header) {
                onClick.call(context, this, header);
            });
}
