require.config({
    baseUrl: 'assets/js',
    paths: {
        "jquery": 'libs/jquery.min',
        "hammerjs": 'libs/hammer.min',
        "easing": 'libs/easing.min',
        "fullPage": 'libs/fullPage.min',
        "materialize": 'libs/materialize.min',
        "videoModule": 'video/Video',
        "generalModule": 'general/General'
    },
    shim: {
        "jquery": {exports: "jquery"},
        "hammerjs": {exports: "hammerjs"},
        "easing": {deps: ["jquery"]},
        "fullPage": {deps: ["jquery"]},
        "materialize": {deps: ["jquery", "hammerjs"]},
        "VideoModule": {deps: ["jquery"]},
        "GeneralModule": {deps: ["jquery", "fullPage", "materialize"]}
    }
});
require(['jquery', 'videoModule', 'generalModule', 'hammerjs', 'easing', 'fullPage', 'materialize'], function ($, VideoModule, GeneralModule) {
    var videoModule = new VideoModule();
    videoModule.init();
    var generalModule = new GeneralModule();
    generalModule.init();
});