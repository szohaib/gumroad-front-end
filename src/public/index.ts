import Overlay from './classes/Overlay';
import Embed from './classes/Embed';
import Build from './classes/Build';

window.addEventListener("load", () => {
    new Overlay();
});
window.addEventListener("load", () => {
    new Embed();
});

const build = new Build();
window.addEventListener("load", () => {
    build
});