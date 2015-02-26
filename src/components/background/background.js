// http://codepen.io/45kb/pen/EsAdI
'use strict';
(function () {
  angular.module('translunar')
    .directive('bgImg', [function () {
  return {
    'restrict': 'A',
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
        console.log(5);
        $scope.currentOpacity = element[0].style.opacity;
        if ($scope.imageDirFlag < 0) {
          console.log(6);
          if ($scope.currentOpacity >= 0) {
            console.log(7);
            $scope.currentOpacity -= 0.1;
          } else {
            console.log(8);
            $scope.imageDirFlag *= -1; // change direction
            $scope.currentImageId++; // next image
            if ($scope.currentImageId >= $scope.imagesArr.length) {
              console.log(9);
              $scope.currentImageId = 0;
            }
          }
        } else {
          console.log(10);
          if ($scope.currentOpacity <= $scope.maxOpacity) {
            console.log(11);
            $scope.currentOpacity += 0.1;
          } else {
            console.log(12);
            $scope.imageDirFlag *= -1; // change direction
            $scope.currentImageId++; // next image
            if ($scope.currentImageId >= $scope.imagesArr.length) {
              console.log(13);
              $scope.currentImageId = 0;
            }
          }
        }
        console.log(14);
   //     $scope.setBg($scope.currentOpacity);
      };

      $scope.setOpacity = function(opacity) {
        console.log(91);
        $scope.setOpacity(opacity);
        console.log(92);
        element[0].style.opacity = opacity;
        console.log(93);
        var filterVal = Math.trunc(100 * opacity);
        console.log(94);
        element[0].style.filter ='alpha(opacity=' + filterVal +')';
        console.log(95);
      };

  //    $timeout($scope.updateImage(), 5000);
    }
  };

}]);
})();
