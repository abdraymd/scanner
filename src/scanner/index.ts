import { BarcodeDetectorPolyfill } from '@undecaf/barcode-detector-polyfill';

const init = (container: HTMLElement) => {
    const detector = new BarcodeDetectorPolyfill({
        formats: ['ean_13']
    });

    const videoEl = document.createElement('video');
    videoEl.setAttribute('muted', 'true');
    videoEl.setAttribute('autoplay', 'true');
    videoEl.setAttribute('playsinline', 'true');
    videoEl.classList.add('scanner-video');

    container.append(videoEl);

    const detect = () => {
        return detector.detect(videoEl);
    };

    detect();
};

export { init };
