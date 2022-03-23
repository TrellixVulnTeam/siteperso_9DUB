var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import React  from "react";
var Test = function (_React$Component) {
    _inherits(Test, _React$Component);

    function Test(props) {
        _classCallCheck(this, Test);

        var _this = _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this, props));

        _this.state = {
            data: []
        };
        return _this;
    }

    _createClass(Test, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            fetch("http://localhost:4000/langages", {
                method: "GET",
                credentials: "include"
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                return _this2.setState({ data: data });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var frameJsx = this.state.data.map(function (item, key) {
                return console.log(item), React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        "div",
                        null,
                        React.createElement("img", { style: { width: "100px", height: "100px" }, src: "http://localhost:4000/" + item.langages_frameworks_image_path, alt: "" })
                    )
                );
            });
            return React.createElement(
                "div",
                null,
                frameJsx
            );
        }
    }]);

    return Test;
}(React.Component);

ReactDOM.render(React.createElement(Test, null), document.getElementById('languages-frame'));