// http://codepen.io/45kb/pen/EsAdI
'use strict';
(function () {
  angular.module('translunar')
    .directive('bgImg', function ($interval) {
  return {
    'restrict': 'EA',
    'scope': true,
    'link': function ($scope, element, attrs) {
      var imagesArr;
      var currentImageId = 0;
      var currentOpacity = attrs.bgMaxOpacity;
      var maxOpacity = attrs.bgMaxOpacity;
      var minOpacity = attrs.bgMinOpacity;
      var imageDirFlag = -1;
      var animSpeedDown = 10;
      var animSpeedUp = 100;
      var animPause = 3000;
      var intervalTime = animSpeedDown;
      var animStep = 0.001;

      $scope.setBg = function (opacityArg) {
        console.log(1);

        var imageSrc;
        if (imagesArr) {
          imageSrc = imagesArr[currentImageId];
        } else {
          if (attrs.bgSrc) {
            imageSrc = attrs.bgSrc;
          } else {
            /* jshint ignore:start */
            imagesArr = eval(attrs.bgSrcArray);
            /* jshint ignore:end */
            imageSrc = imagesArr[currentImageId];
          }
        }

        element[0].style.backgroundImage =  'url(' + imageSrc + ') ';
        element[0].style.backgroundRepeat = attrs.bgRepeat;
        element[0].style.backgroundSize = attrs.bgSize;
        element[0].style.backgroundAttachment = attrs.bgAttachment;
        element[0].style.width = '100%';
        element[0].style.height = 'auto';

        var opacity = Number(opacityArg);
        if (undefined === opacity || isNaN(opacity)) {
          opacity = maxOpacity;
          currentOpacity = maxOpacity;
        }
      };

      $scope.setBg(currentOpacity);

      $scope.updateImage = function() {
        if (imageDirFlag < 0) {
          intervalTime = animSpeedDown;
          if (currentOpacity >= minOpacity) {
            currentOpacity -= animStep;
          } else {
            imageDirFlag *= -1; // change direction
            currentImageId++; // next image
            if (currentImageId >= imagesArr.length) {
              currentImageId = 0;
            }
            $scope.setBg(currentOpacity);
          }
        } else {

          intervalTime = animSpeedUp;
          if (currentOpacity <= maxOpacity) {
            currentOpacity += animStep;
          } else {
            imageDirFlag *= -1; // change direction
            intervalTime = animPause;
          }
        }
        $scope.setOpacity(currentOpacity);
      };

      $scope.setOpacity = function(opacity) {
        element[0].style.opacity = opacity;
        var filterVal = Math.trunc(100 * opacity);
        element[0].style.filter ='alpha(opacity=' + filterVal +')';
      };

      $interval($scope.updateImage, intervalTime);
    }
  };

});
})();
