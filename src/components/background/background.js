// http://codepen.io/45kb/pen/EsAdI
'use strict';
(function () {
  angular.module('translunar')
    .directive('bgImg', function ($interval) {
  return {
    'restrict': 'EA',
    'scope': true,
    'link': function ($scope, element, attrs) {
      $scope.imagesArr = undefined;
      $scope.currentImageId = 0;
      $scope.currentOpacity = attrs.bgMaxOpacity;
      $scope.maxOpacity = 0.4;
      $scope.imageDirFlag = -1;
      $scope.setBg = function (opacityArg) {
        console.log(1);

        var imageSrc;
        if ($scope.imagesArr) {
          imageSrc = $scope.imagesArr[$scope.currentImageId];
        } else {
          if (attrs.bgSrc) {
            imageSrc = attrs.bgSrc;
          } else {
            /* jshint ignore:start */
            $scope.imagesArr = eval(attrs.bgSrcArray);
            /* jshint ignore:end */
            imageSrc = $scope.imagesArr[$scope.currentImageId];
          }
        }

        element[0].style.backgroundImage =  'url(' + imageSrc + ') ';
        element[0].style.backgroundRepeat = attrs.bgRepeat;
        element[0].style.backgroundSize = attrs.bgSize;
        element[0].style.backgroundAttachment = attrs.bgAttachment;

        var opacity = Number(opacityArg);
        if (undefined === opacity || isNaN(opacity)) {
          opacity = $scope.maxOpacity;
        } else {
          $scope.maxOpacity = opacity;
        }
      };

      $scope.setBg($scope.currentOpacity);

      $scope.updateImage = function() {
        $scope.currentOpacity = element[0].style.opacity;
        if ($scope.imageDirFlag < 0) {
          if ($scope.currentOpacity >= 0) {
            console.log(7);
            $scope.currentOpacity -= 0.1;
          } else {
            console.log(8);
            $scope.imageDirFlag *= -1; // change direction
            $scope.currentImageId++; // next image
            if ($scope.currentImageId >= $scope.imagesArr.length) {
              $scope.currentImageId = 0;
            }
          }
        } else {
          if ($scope.currentOpacity <= $scope.maxOpacity) {
            $scope.currentOpacity += 0.1;
          } else {
            $scope.imageDirFlag *= -1; // change direction
            $scope.currentImageId++; // next image
            if ($scope.currentImageId >= $scope.imagesArr.length) {
              $scope.currentImageId = 0;
            }
          }
        }
   //     $scope.setBg($scope.currentOpacity);
      };

      $scope.setOpacity = function(opacity) {
        $scope.setOpacity(opacity);
        element[0].style.opacity = opacity;
        var filterVal = Math.trunc(100 * opacity);
        element[0].style.filter ='alpha(opacity=' + filterVal +')';
      };

      $interval($scope.updateImage(), 5000);
    }
  };

});
})();
