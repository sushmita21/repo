(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService , $location) {
        var model = this;
        model.userId = $routeParams.uid;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pid;
        model.widgetId = $routeParams.wgid;

        function init() {
            var promise = WidgetService.findWidgetById(model.widgetId);
            promise.then(function(result)
            {
                console.log(result);
                model.widget =result;
            })

        }init();

        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function updateWidget(updatedWidget) {
            console.log("upd wid");
            console.log(updatedWidget);
            if(updatedWidget.text === null || updatedWidget.text === "" )
            {
                model.error = "Name is required";
            }
            else
            {

                var promise = WidgetService.updateWidget(model.widgetId, updatedWidget);
                promise.then(function(result)
                {
                    $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                });
            }

        }
        function deleteWidget(wgid) {
            var deleteResult = WidgetService.deleteWidget(wgid);
            deleteResult.then(function(result)
            {
                $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
            });


        }
    }
})();