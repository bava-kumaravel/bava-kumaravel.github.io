angular.module('app', []);

angular.module('app').controller('mainCntrl', ['$scope',
function ($scope) {

  $scope.master = {}; // MASTER DATA STORED BY YEAR

  $scope.selected_year =0;
  $scope.years = d3.range(0, 25, 1);

  $scope.yearsArray = [];
  $scope.tempyearsArray = [];

  $scope.filters = {};
  $scope.hasFilters = false;

  $scope.tooltip = {};

  // FORMATS USED IN TOOLTIP TEMPLATE IN HTML
  $scope.pFormat = d3.format(".1%");  // PERCENT FORMAT
  $scope.qFormat = d3.format(",.0f"); // COMMAS FOR LARGE NUMBERS

  $scope.updateTooltip = function (data) {
    $scope.tooltip = data;
    $scope.$apply();
  }

  $scope.addFilter = function (name) {
    $scope.hasFilters = true;
    $scope.filters[name] = {
      name: name,
      hide: true
    };
    $scope.$apply();
  };

  $scope.update = function () {
    var data = $scope.master[$scope.selected_year];

    if (data && $scope.hasFilters) {
      console.log("First block executes");
      $scope.drawChords(data.filter(function (d) {
        var fl = $scope.filters;
        var v1 = d.Giver, v2 = d.Receiver;

        if ((fl[v1] && fl[v1].hide) || (fl[v2] && fl[v2].hide)) {
          return false;
        }
        return true;
      }));
    } else if (data) {
      console.log("Second block executes");
      $scope.drawChords(data);
    }
  };

$scope.i=-1;
$scope.PlayButtonClicked = function(){
  if($scope.i<$scope.yearsArray.length-1){
    $scope.i++;
    document.getElementById("year_"+$scope.yearsArray[$scope.i]).checked = true;

    //console.log("Play Button function called");
    //$scope.tempyearsArray.push(1870);
    $scope.selected_year = $scope.yearsArray[$scope.i];
    $scope.hasfilters = true;
    $scope.update();
    var t = setTimeout($scope.PlayButtonClicked, 2000);
    document.getElementById("Heading_down").innerHTML = "Transactions between families : "+$scope.selected_year+" months";
  }
else{
  $scope.i=-1;
}


}


    $scope.ColorsArray=[];
    d3.csv("../csv/ColorData/ColorData_133.csv", function(data){
      data.forEach(function(d){
        console.log("Color pushed "+d.Color);
        $scope.ColorsArray.push(d.Color);
        console.log("ColorsArray" + $scope.ColorsArray.length);
        console.log($scope.ColorsArray);
      })

    })

    //ColorsArray = ["0A9A6C","FE5A06"];

    //ColorsArray=["#8c0000", "#e57373", "#ff4400", "#592816", "#993d00", "#ffb380", "#e6c3ac", "#734b1d",
      //          "#e59900", "#7f6600", "#ffd940", "#403d10", "#b9bf60", "#add900", "#718060", "#2e7300",
        //        "#44ff00", "#c8ffbf", "#264d26", "#30bf56", "#00f2c2", "#20806c", "#00cad9", "#a3d5d9",
          //      "#164c59", "#003d73", "#001b33", "#3995e6", "#738799", "#000f73", "#6559b3", "#b1a3d9",
            //    "#7400d9", "#220033", "#45264d", "#302633", "#6b0073", "#f240ff", "#f279da", "#ff0088",
              //  "#8c235b", "#f20041", "#ffbfd0", "#806068", "#59000c", "#4c262b"];
$scope.ColorsArray = ["#F44336", "#673AB7", "#03A9F4", "#4CAF50", "#FFEB3B", "#FF5722", "#607D8B", "#E91E63", "#3F51B5", "#00BCD4", "#8BC34A", "#FFC107", "#795548", "#9C27B0", "#2196F3", "#009688", "#CDDC39", "#FF9800", "#9E9E9E", "#EF9A9A", "#B39DDB", "#81D4FA", "#A5D6A7", "#FFF59D", "#FFAB91", "#B0BEC5", "#F48FB1", "#9FA8DA", "#80DEEA", "#C5E1A5", "#FFE082", "#BCAAA4", "#CE93D8", "#90CAF9", "#80CBC4", "#E6EE9C", "#FFCC80", "#EEEEEE", "#B71C1C", "#311B92", "#01579B", "#1B5E20", "#F57F17", "#BF360C", "#263238", "#880E4F", "#1A237E", "#006064", "#33691E", "#FF6F00", "#3E2723", "#4A148C", "#0D47A1", "#004D40", "#827717", "#E65100", "#212121"];

    $scope.colors = function(id){
      console.log($scope.ColorsArray);
      if(id==="Community"){
        return "111111";
      }else{
        var idB=id.split("__");
        if(idB[0]==="Community"){
          return "000000";
        }else{
          var idA = idB[0].split(" ");
          console.log("returning "+id+" "+idA[1]+" " +$scope.ColorsArray[idA[1]]);
          var str = $scope.ColorsArray[idA[1]];
          return str;
        }

      }

    }

  // IMPORT THE CSV DATA
  d3.csv("../csv/Costing_24months.csv", function (err, data) {
    console.log(data);
    data.forEach(function (d) {
      if($scope.yearsArray.length>0){
        if($scope.yearsArray[$scope.yearsArray.length-1]===d.CurrentState){

        }else{
          $scope.yearsArray.push(d.CurrentState);
          //window.alert($scope.yearsArray[length-1]);
        }
      }else{
        $scope.yearsArray.push(d.CurrentState);
        //window.alert(d.year+" added!");
      }
      d.CurrentState  = +d.CurrentState;
      d.Amount = +d.Amount;
      d.Color = +d.Color;

      if (!$scope.master[d.CurrentState]) {
        $scope.master[d.CurrentState] = []; // STORED BY YEAR
      }
      $scope.master[d.CurrentState].push(d);
      console.log(d);
    })
    $scope.update();
    //window.alert($scope.yearsArray);
  });

  $scope.$watch('selected_year', $scope.update);
  $scope.$watch('filters', $scope.update, true);

  //$scope.$watch('tempyearsArray', function(newValue, oldValue, scope){
    //console.log("temp years array func getting executed.");
    //$scope.selected_year = newValue[newValue.length-1];
    //$scope.update();
  //})

}]);
