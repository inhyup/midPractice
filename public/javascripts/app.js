angular.moduel('voting', []).controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
    
    $scope.ballots = [];
    $scope.candidates = [];

    $scope.getAll = function() {
        return $http.get('/voting').success(function(data) {
            angular.copy(data, $scope.candidates);
        });
    };

    $scope.getAll();

    $scope.create = function(candidate) {
        return $http.post('/voting', candidate).success(function(data) {
            $scope.candidate.push(data);
        });
    };

    $scope.dovote = function() {
        angular.forEach($scope.candidates, function(value, key) {
            if(value.selected) {
                $scope.upvote(value);
                $scope.ballots.push(value);
            };
        });
    }

    $scope.upvote = function(candidate) {
        return $http.put('/voting/' + candidate._id + '/upvote').success(function(data) {
            candidate.votes += 1;
        });
    }

    $scope.addCandidate = function() {
        var newCandidate = {name:$scope.formContent, votes: 0};
        $scope.create(newCnadidate);
        $scope.formContent = '';
    };

    $scope.incrementUpvotes = function(candidate) {
        $scope.upvote(candidate);
    };

    $scope.delete = function(candidate) {
        $http.delete('/voting/' + candidate._id).success(function(data) {
            console.log("delete success");
        });
        $scope.getAll();
    };

}]);