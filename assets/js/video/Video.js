define(['jquery'], function ($) {
    var module = function () {
        var _this = $(this);
        var _player;
        var _playerShort;
        _this.initVideoShort = function () {
            _playerShort = document.getElementById("video-short");
            _playerShort.play();
            var _buffer = _playerShort.buffered;
            var _bufferInterval = setInterval(function () {
                if (_buffer.start(0) == 0 && _buffer.end(0) == _playerShort.duration) {
                    _playerShort.play();
                }
                if (_playerShort.paused == false) {
                    clearInterval(_bufferInterval);
                }
            }, 2000);
        };
        _this.initVideoFull = function () {
            if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
                window.onYouTubeIframeAPIReady = function () {
                    _this.buildVideoFull();
                };
                $.getScript('//www.youtube.com/iframe_api');
            } else {
                _this.buildVideoFull();
            }
        };
        _this.buildVideoFull = function () {
            _player = new YT.Player('video-full', {
                width: '1920',
                height: '1080',
                events: {'onStateChange': onPlayerStateChange},
                playerVars: {'rel': 0},
                videoId: 'J3MD7AZyp68'
            });
            function onPlayerStateChange(event) {
                if (event.data === 0) {
                    _this.stopVideoFull(_player);
                    _this.closeVideo();
                }
                if (event.data == YT.PlayerState.PLAYING) {
                    _player.setPlaybackQuality('hd720');
                }
            }
        };
        _this.playVideoFull = function (_player) {
            setTimeout(function () {
                _player.setPlaybackQuality('hd1080');
                _player.playVideo();
            }, 1000);
        };
        _this.stopVideoFull = function (_player) {
            _player.pauseVideo();
        };
        _this.fullVideo = function () {
            $.fn.fullpage.setAllowScrolling(false);
            $('#welcome').addClass('video-playing');
            $('#welcome .container').addClass('video-playing');
            $('#welcome .close-video').addClass('video-playing');
            $('#sideNav').addClass('video-playing');
            $('#mainNav').addClass('video-playing');
            $('#video-short').addClass('video-playing');
            $('.pattern').addClass('video-playing');
            setTimeout(function () {
                $('#welcome').removeClass('video-playing');
                $('#video-full').addClass('video-playing');
            }, 2000);
        };
        _this.closeVideo = function () {
            $('#welcome').addClass('video-playing');
            $('#video-full').removeClass('video-playing');
            setTimeout(function () {
                $.fn.fullpage.setAllowScrolling(true);
                $('#welcome').removeClass('video-playing');
                $('#welcome .container').removeClass('video-playing');
                $('#welcome .close-video').removeClass('video-playing');
                $('#sideNav').removeClass('video-playing');
                $('#mainNav').removeClass('video-playing');
                $('#video-short').removeClass('video-playing');
                $('.pattern').removeClass('video-playing');
            }, 2000);
        };
        this.init = function () {
            $(window).load(function () {
                _this.initVideoShort();
            });
            _this.initVideoFull();
            $('img#play-video-full').click(function () {
                _this.fullVideo();
                _this.playVideoFull(_player);
            });
            $('img.close-video').click(function () {
                _this.stopVideoFull(_player);
                _this.closeVideo();
            });
        };
    };
    return module;
});