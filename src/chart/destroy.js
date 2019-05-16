import { select } from 'd3';

export default function destroy(destroyControls = true) {
    //run onDestroy callback
    this.events.onDestroy.call(this);

    //remove resize event listener
    var context = this;
    if (!this.test)
        select(window).on('resize.' + context.element + context.id, null);

    //destroy controls
    if (destroyControls && this.controls) {
        this.controls.destroy();
    }

    //unmount chart wrapper
    this.wrap.remove();
}
