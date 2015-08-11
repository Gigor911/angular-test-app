speroteck.service('layoutToggle', function() {
    this.preSet = function() {
        if (!localStorage.getItem("layout")) {
            localStorage.setItem("layout", "grid");
        }
    };
    this.setGrid = function() {
        localStorage.setItem("layout", "grid");
        var layout = localStorage.getItem("layout");
        return layout;
    };
    this.setList = function() {
        localStorage.setItem("layout", "list");
        var layout = localStorage.getItem("layout");
        return layout;
    }
});