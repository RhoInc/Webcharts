import { select } from 'd3';

export default function destroy(destroyControls = false) {
    //run onDestroy callback
    this.events.onDestroy.call(this);

    //destroy controls
    if (destroyControls && this.controls) {
        this.controls.destroy();
    }

    //unmount chart wrapper
    this.wrap.remove();
}
